import axios from "axios";
import {
  USER_LOADED,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOG_OUT,
  AUTH_ERROR,
  LOGIN_START,
  DEFAULT_SESSION,
} from "./types";

import setAuthToken from "../utils/setAuthToken";

//LOAD USER
export const loadUser = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (localStorage.token) {
    setAuthToken(localStorage.token);

    try {
      console.log("trying this");
      const res = await axios.get(
        "http://localhost:8080/pos/auth/me",
        config
      );

      console.log(res.data);

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  }
};

//LOGIN
export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username, password });

  dispatch({
    type: LOGIN_START,
  });

  try {
    const res = await axios.post(
      "http://localhost:8080/pos/auth/login",
      body,
      config
    );

    console.log(res.data.token)

    setAuthToken(res.data.token);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token); // Guarda el token en localStorage
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      // Puedes también cargar el usuario automáticamente si lo prefieres
      dispatch(loadUser());
    } else {
      console.error("No token found in response");
      dispatch({
        type: LOGIN_FAILED,
      });
    }

    /* dispatch(loadUser()); */
  } catch (error) {
    console.log(error);

    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

export const setDefaultSession = () => (dispatch) => {
  dispatch({ type: DEFAULT_SESSION });
};

//LOGOUT
export const logout = () => (dispatch) => {
  dispatch({ type: LOG_OUT });
  localStorage.removeItem("token");
};
