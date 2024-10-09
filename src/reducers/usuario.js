import {
    POST_USUARIO,
    USUARIO_ERROR,
    GET_USUARIOS,
    GET_USUARIO,
  } from "../actions/types";
  
  const initialState = {
    usuarios: [],
    usuario: {},
    loading: false,
    error: {},
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_USUARIOS:
        return {
          ...state,
          usuarios: payload,
          loading: false,
        };
  
      case GET_USUARIO:
        return {
          ...state,
          usuario: payload,
          loading: false,
        };
  
      case POST_USUARIO:
        return {
          ...state,
          usuarios: [payload, ...state.usuarios],
          loading: false,
        };
  
      case USUARIO_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
  
      default: {
        return state;
      }
    }
  }
  