import axios from "axios";

import {
  POST_CATEGORIA,
  CATEGORIA_ERROR,
  GET_CATEGORIAS,
  GET_CATEGORIA,
  UPDATE_CATEGORIA,
  DELETE_CATEGORIA,
} from "./types";

// GET CATEGORIAS
export const getCategorias = () => async (dispatch) => {
  try {
    console.log("Trying to get categorias");

    const res = await axios.get("http://localhost:8080/pos/categoria/read");

    console.log(res.data);

    dispatch({
      type: GET_CATEGORIAS,
      payload: res.data,
    });
  } catch (error) {
    console.error("Error fetching categorias:", error);
    dispatch({
      type: CATEGORIA_ERROR,
      payload: {
        msg: error.response ? error.response.data : "Network Error",
        status: error.response ? error.response.status : null,
      },
    });
  }
};

// GET CATEGORIA
export const getCategoria = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8080/pos/categoria/${id}`);

    dispatch({
      type: GET_CATEGORIA,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORIA_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// POST CATEGORIA
export const addCategoria = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/pos/categoria/crear",
      formData
    );
    console.log("Categoria agregada:", res.data);
    dispatch({
      type: POST_CATEGORIA,
      payload: res.data.data,
    });
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    dispatch({
      type: CATEGORIA_ERROR,
      payload: {
        msg: error.response ? error.response.data : "Server Error",
        status: error.response ? error.response.status : 500,
      },
    });
    return {
      success: false,
      error: error.response ? error.response.data : "Server Error",
    };
  }
};

// PATCH CATEGORIA (actualizar una categoria)
export const patchCategoria = (id, updatedData) => async (dispatch) => {
  try {
    const res = await axios.patch(
      `http://localhost:8080/pos/categoria/${id}`,
      updatedData
    );
    console.log("Respuesta del servidor al actualizar categoria:", res.data);
    dispatch({
      type: UPDATE_CATEGORIA,
      payload: res.data.data,
    });

    return res.data;
  } catch (error) {
    console.error("Error al actualizar categoria:", error.response || error.message);
    dispatch({
      type: CATEGORIA_ERROR,
      payload: {
        msg: error.response ? error.response.data : "Server Error",
        status: error.response ? error.response.status : 500,
      },
    });

    return {
      success: false,
      error: error.response ? error.response.data : "Server Error",
    };
  }
};

// DELETE CATEGORIA
export const deleteCategoria = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8080/pos/categoria/${id}`);

    dispatch({
      type: DELETE_CATEGORIA,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: CATEGORIA_ERROR,
      payload: {
        msg: error.response ? error.response.data : "Server Error",
        status: error.response ? error.response.status : 500,
      },
    });
  }
};
