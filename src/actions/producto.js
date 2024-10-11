import axios from "axios";

import {
  POST_PRODUCTO,
  PRODUCTO_ERROR,
  GET_PRODUCTOS,
  GET_PRODUCTO,
  UPDATE_PRODUCTO,
  DELETE_PRODUCTO,
} from "./types";

// GET PRODUCTOS
// GET PRODUCTOS
export const getProductos = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8080/pos/producto/listar");

    // Asegúrate de que la respuesta contenga un array
    if (!Array.isArray(res.data)) {
      throw new Error("La respuesta no es un array de productos.");
    }

    dispatch({
      type: GET_PRODUCTOS,
      payload: res.data, // Suponiendo que res.data es el array de productos
    });
  } catch (error) {
    dispatch({
      type: PRODUCTO_ERROR,
      payload: {
        msg: error.response ? error.response.data : "Network Error",
        status: error.response ? error.response.status : null,
      },
    });
  }
};

// GET PRODUCTO
export const getProducto = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8080/pos/producto/${id}`);
    
    dispatch({
      type: GET_PRODUCTO,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTO_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// POST PRODUCTO
export const addProducto = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/pos/producto/crear",
      formData
    );
    console.log("Producto agregado:", res.data);
    dispatch({
      type: POST_PRODUCTO,
      payload: res.data.data,  
    });
    return {
      success: true,
      data: res.data, 
    };
  } catch (error) {
    dispatch({
      type: PRODUCTO_ERROR,
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

// PATCH PRODUCTO (actualizar un producto)
export const patchProducto = (id, updatedData) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:8080/pos/producto/${id}`, updatedData);
    console.log("Respuesta del servidor al actualizar producto:", res.data)
    dispatch({
      type: UPDATE_PRODUCTO,
      payload: res.data.data, 
    });

    return res.data;
  } catch (error) {
    console.error("Error al actualizar producto:", error.response || error.message);
    dispatch({
      type: PRODUCTO_ERROR,
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

// DELETE PRODUCTO
export const deleteProducto = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8080/pos/producto${id}`);

    dispatch({
      type: DELETE_PRODUCTO,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTO_ERROR,
      payload: {
        msg: error.response ? error.response.data : "Server Error",
        status: error.response ? error.response.status : 500,
      },
    });
  }
};
