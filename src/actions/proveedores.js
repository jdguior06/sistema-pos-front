import axios from "axios";
import {
  GET_PROVEEDORES,
  GET_PROVEEDOR,
  POST_PROVEEDOR,
  UPDATE_PROVEEDOR,
  DELETE_PROVEEDOR,
  PROVEEDOR_ERROR,
} from "./types";

// GET PROVEEDORES
export const getProveedores = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8080/pos/proveedor");
    dispatch({
      type: GET_PROVEEDORES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROVEEDOR_ERROR,
      payload: {
        msg: error.response ? error.response.data : "Error de Red",
        status: error.response ? error.response.status : null,
      },
    });
  }
};

// GET PROVEEDOR
export const getProveedor = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8080/pos/proveedor/${id}`);
    dispatch({
      type: GET_PROVEEDOR,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROVEEDOR_ERROR,
      payload: {
        msg: error.response ? error.response.data : "Error de Red",
        status: error.response ? error.response.status : null,
      },
    });
  }
};

// POST PROVEEDOR
export const addProveedor = (formData) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:8080/pos/proveedor", formData);
    dispatch({
      type: POST_PROVEEDOR,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: PROVEEDOR_ERROR,
      payload: {
        msg: error.response ? error.response.data : "Error de Red",
        status: error.response ? error.response.status : 500,
      },
    });
  }
};

// PATCH PROVEEDOR (Actualizar un proveedor)
export const patchProveedor = (id, updatedData) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:8080/pos/proveedor/${id}`, updatedData);
    dispatch({
      type: UPDATE_PROVEEDOR,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: PROVEEDOR_ERROR,
      payload: {
        msg: error.response ? error.response.data : "Error de Red",
        status: error.response ? error.response.status : 500,
      },
    });
  }
};

// DELETE PROVEEDOR (Desactivar un proveedor)
export const deleteProveedor = (id) => async (dispatch) => {
  try {
    await axios.patch(`http://localhost:8080/pos/proveedor/${id}/desactivar`);
    dispatch({
      type: DELETE_PROVEEDOR,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: PROVEEDOR_ERROR,
      payload: {
        msg: error.response ? error.response.data : "Error de Red",
        status: error.response ? error.response.status : 500,
      },
    });
  }
};