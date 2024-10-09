import {
  GET_PROVEEDORES,
  GET_PROVEEDOR,
  POST_PROVEEDOR,
  UPDATE_PROVEEDOR,
  DELETE_PROVEEDOR,
  PROVEEDOR_ERROR,
} from "../actions/types";

const initialState = {
  proveedores: [],
  proveedor: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROVEEDORES:
      return {
        ...state,
        proveedores: payload,
        loading: false,
      };
    case GET_PROVEEDOR:
      return {
        ...state,
        proveedor: payload,
        loading: false,
      };
    case POST_PROVEEDOR:
      return {
        ...state,
        proveedores: [payload, ...state.proveedores],
        loading: false,
      };
    case UPDATE_PROVEEDOR:
      return {
        ...state,
        proveedores: state.proveedores.map((proveedor) =>
          proveedor.id === payload.id ? payload : proveedor
        ),
        loading: false,
      };
    case DELETE_PROVEEDOR:
      return {
        ...state,
        proveedores: state.proveedores.filter(
          (proveedor) => proveedor.id !== payload
        ),
        loading: false,
      };
    case PROVEEDOR_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}