import {
    GET_CATEGORIAS,
    CATEGORIA_ERROR,
    POST_CATEGORIA,
    GET_CATEGORIA,
    UPDATE_CATEGORIA,
    DELETE_CATEGORIA
} from '../actions/types';

const initialState = {
    categorias: [],  // Siempre inicializamos como array vacío
    categoria: null,
    loading: true,
    error: {},
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_CATEGORIAS:
      return {
        ...state,
        categorias: payload, // payload debe ser un array
        loading: false,
      };
        case GET_CATEGORIA:
            return {
                ...state,
                categoria: payload,
                loading: false
            };
        case POST_CATEGORIA:
            return {
                ...state,
                categorias: [payload, ...state.categorias],
                loading: false
            };
        case UPDATE_CATEGORIA:
            return {
                ...state,
                categorias: state.categorias.map(categoria =>
                    categoria._id === payload._id ? payload : categoria
                ),
                loading: false
            };
        case DELETE_CATEGORIA:
            return {
                ...state,
                categorias: state.categorias.filter(categoria => categoria._id !== payload),
                loading: false
            };
        case CATEGORIA_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}