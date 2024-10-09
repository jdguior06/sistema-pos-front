import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOG_OUT,
  LOGIN_START,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: false,
  loginSuccess: false,
  user: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        error: null,
      };

    case LOGIN_START:
      console.log(state.loading);
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        token: payload.token,
        payload,
        user: payload.email,
        isAuthenticated: true,
        loginSuccess: true,
        loading: false,
        error: null,
      };

    case LOGIN_FAILED:
      localStorage.removeItem("token");
      return {
        ...state,
        payload,
        isAuthenticated: false,
        loading: false,
        error: "Bad Login",
      };

    case AUTH_ERROR:
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
