import {
    REGISTRO_OK,
    REGISTRO_ERROR,
    GET_USUARIO,
    LOGIN_OK,
    LOGIN_ERROR,
    CERRAR_SESION,
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case REGISTRO_OK:
        case LOGIN_OK:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                auth: true,
                msg: null,
                loading: false
            }
        case REGISTRO_ERROR:
        case LOGIN_ERROR:
            return {
                ...state,
                token: null,
                msg: action.payload,
                loading: false
            }
        case GET_USUARIO:
            return {
                ...state,
                auth: true,
                user: action.payload.user,
                loading: false
            }
        case CERRAR_SESION:
            return {
                token: null,
                auth: null,
                user: null,
                msg: null,
                loading: false
            }
        default:
            return state;
    }
}