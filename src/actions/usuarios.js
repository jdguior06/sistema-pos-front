import axios from "axios";
import Cookies from "js-cookie";

import {
  POST_USUARIO,
  USUARIO_ERROR,
  GET_USUARIOS,
  GET_USUARIO,
} from "./types";

// GET USUARIOS
export const getUsuarios = () => async (dispatch) => {
  try {

    console.log("Trying to get clientes");
    const res = await axios.get("http://localhost:8080/pos/user");
    console.log(res.data);
    dispatch({
      type: GET_USUARIOS,
      payload: res.data,
    });
  } catch (error) {
    console.error("Error fetching clientes:", error);
    dispatch({
      type: USUARIO_ERROR,
      payload: {
        msg: error.response ? error.response.data : "Network Error",
        status: error.response ? error.response.status : null,
      },
    });
  }
};
//GET USUARIO
export const getUsuario = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8080/pos/user/${id}`);
    dispatch({
      type: GET_USUARIO,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USUARIO_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//POST USUARIO
export const addUsuario = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/pos/user",
      formData
    );

    dispatch({
      type: POST_USUARIO,
      payload: res.data,
    });

    return { success: true };
  } catch (error) {
    dispatch({
      type: USUARIO_ERROR,
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

// PATCH USUARIO 
export const patchUsuario = (id, updatedData) => async (dispatch) => {
  try {
    const res = await axios.patch(`http://localhost:8080/pos/user/${id}`, updatedData);
    dispatch({
      type: PATCH_USUARIO,
      payload: res.data, 
    });

    return { success: true };
  } catch (error) {
    dispatch({
      type: USUARIO_ERROR,
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
