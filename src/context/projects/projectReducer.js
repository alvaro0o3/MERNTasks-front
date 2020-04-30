import {
    FORMULARIO_PROYECTO,
    GET_PROYECTOS,
    ADD_PROYECTO,
    VALIDAR_FORMULARIO,
    SET_PROYECTO,
    DELETE_PROYECTO,
    ERROR_PROYECTO
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_PROYECTO:
            return {
                ...state,
                formNewProject: true
            }
        case GET_PROYECTOS:
            return {
                ...state,
                projects: action.payload
            }
        case ADD_PROYECTO:
            return {
                ...state,
                projects: [action.payload, ...state.projects],
                formNewProject: false,
                errorForm: false
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorForm: true
            }
        case SET_PROYECTO:
            return {
                ...state,
                actualProject: action.payload
            }
        case DELETE_PROYECTO:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                actualProject: null
            }
        case ERROR_PROYECTO:
            return {
                ...state,
                message: action.payload
            }

        default:
            return state;
    }
}