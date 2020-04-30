import {
    TAREAS_PROYECTO,
    ADD_TAREA,
    VALIDAR_FORM_TAREAS,
    DELETE_TAREA,
    SET_TAREA,
    UPDATE_TAREA,
    CLEAN_TAREAS
} from '../../types';


export default (state, action) => {
    switch (action.type) {
        case TAREAS_PROYECTO:
            return {
                ...state,
                projectTasks: action.payload
            }
        case ADD_TAREA:
            return {
                ...state,
                projectTasks: [action.payload, ...state.projectTasks], // Pongo primero el payload para se se ponga el primero en la lista
                errorFormTask: false
            }
        case VALIDAR_FORM_TAREAS:
            return {
                ...state,
                errorFormTask: true
            }
        case DELETE_TAREA:
            return {
                ...state,
                projectTasks: state.projectTasks.filter(task => task._id !== action.payload)
            }
        case SET_TAREA:
            return {
                ...state,
                actualTask: action.payload
            }
        case UPDATE_TAREA:
            return {
                ...state,
                projectTasks: state.projectTasks.map(task => task._id === action.payload._id ? action.payload : task)
            }
        case CLEAN_TAREAS:
            return {
                ...state,
                projectTasks: []
            }

        default:
            return state;
    }

}