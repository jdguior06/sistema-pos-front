import {
    GET_PRODUCTOS,
    PRODUCTO_ERROR,
    POST_PRODUCTO,
    GET_PRODUCTO,
    UPDATE_PRODUCTO,
    DELETE_PRODUCTO,
  } from "../actions/types";
  
  const initialState = {
    productos: [], // Aseguramos que productos sea un array
    producto: null,
    loading: true,
    error: {},
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case GET_PRODUCTOS:
        return {
          ...state,
          productos: payload, // payload debería ser un array
          loading: false,
        };
      case GET_PRODUCTO:
        return {
          ...state,
          producto: payload,
          loading: false,
        };
      case POST_PRODUCTO:
        return {
          ...state,
          productos: [payload, ...state.productos], // Agregar producto nuevo al array
          loading: false,
        };
      case UPDATE_PRODUCTO:
        return {
          ...state,
          productos: state.productos.map((producto) =>
            producto.id === payload.id ? payload : producto
          ),
          loading: false,
        };
      case DELETE_PRODUCTO:
        return {
          ...state,
          productos: state.productos.filter(
            (producto) => producto.id !== payload
          ),
          loading: false,
        };
      case PRODUCTO_ERROR:
        return {
          ...state,
          error: payload,
          loading: false,
        };
      default:
        return state;
    }
  }