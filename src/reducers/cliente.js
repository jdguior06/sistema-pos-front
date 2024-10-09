import {
  POST_CLIENTE,
  CLIENTE_ERROR,
  GET_CLIENTES,
  GET_CLIENTE,
  UPDATE_CLIENTE,
  DELETE_CLIENTE,
} from "../actions/types";

const initialState = {
  clientes: [],
  cliente: null,
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  console.log("Estado antes de la acción:", state);
  switch (type) {
    case GET_CLIENTES:
      return {
        ...state,
        clientes: payload,
        loading: false,
      };

    case GET_CLIENTE:
      return {
        ...state,
        cliente: payload,
        loading: false,
      };

    case POST_CLIENTE:
      return {
        ...state,
        clientes: [payload, ...state.clientes],
        loading: false,
      };

    case CLIENTE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case UPDATE_CLIENTE:
      return {
        ...state,
        clientes: {
          ...state.clientes,
          data: state.clientes.data.map(cliente =>
            cliente.id === action.payload.id ? action.payload : cliente
          )
        },
        loading: false,
      };

    case DELETE_CLIENTE:
      return {
        ...state,
        clientes: state.clientes.filter(cliente => cliente.id !== payload),
        loading: false,
      };
    default: {
      return state;
    }
  }
}
