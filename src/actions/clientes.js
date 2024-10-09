import axios from "axios";

import {
  POST_CLIENTE,
  CLIENTE_ERROR,
  GET_CLIENTES,
  GET_CLIENTE,
  UPDATE_CLIENTE,
  DELETE_CLIENTE,
} from "./types";

// GET CLIENTES
export const getClientes = () => async (dispatch) => {
  try {

    console.log("Trying to get clientes");

    const res = await axios.get("http://localhost:8080/pos/cliente");

    console.log(res.data);

    dispatch({
      type: GET_CLIENTES,
      payload: res.data,
    });
  } catch (error) {
    console.error("Error fetching clientes:", error);
    dispatch({
      type: CLIENTE_ERROR,
      payload: {
        msg: error.response ? error.response.data : "Network Error",
        status: error.response ? error.response.status : null,
      },
    });
  }
};
//GET CLIENTE
export const getCliente = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8080/pos/cliente/${id}`);
    
    dispatch({
      type: GET_CLIENTE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CLIENTE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//POST cliente
export const addCliente = (formData) => async (dispatch) => {
  try {
    console.log("Formulario enviado:", formData);
    const res = await axios.post(
      "http://localhost:8080/pos/cliente",
      formData
    );
    console.log("Cliente agregado:", res.data);
    console.log("Datos del cliente agregado:", res.data.data);
    // dispatch({
    //   type: POST_CLIENTE,
    //   payload: res.data.data,  
    // });
    return {
      success: true,
      data: res.data, 
    };
  } catch (error) {
    console.log("Error recibido:", error);
    dispatch({
      type: CLIENTE_ERROR,
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

// PATCH CLIENTE (actualizar un cliente)
export const patchCliente = (id, updatedData) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:8080/pos/cliente/${id}`, updatedData);
    console.log("Respuesta del servidor al actualizar cliente:", res.data)
    console.log("Cliente desacctivado", res)
    dispatch({
      type: UPDATE_CLIENTE,
      payload: res.data.data, 
    });
    return res.data;
  } catch (error) {
    console.error("Error al actualizar cliente:", error.response || error.message);
    dispatch({
      type: CLIENTE_ERROR,
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

export const deleteCliente = (id) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:8080/pos/cliente/${id}/desactivar`);
    // dispatch({
    //   type: UPDATE_CLIENTE,
    //   payload: res.data.data,
    // });
    return res.data;
  } catch (error) {
    dispatch({
      type: CLIENTE_ERROR,
      payload: {
        msg: error.response ? error.response.data : "Server Error",
        status: error.response ? error.response.status : 500,
      },
    });
  }
};
