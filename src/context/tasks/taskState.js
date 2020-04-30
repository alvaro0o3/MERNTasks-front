import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import clienteAxios from '../../config/axios';

import {
    TAREAS_PROYECTO,
    ADD_TAREA,
    VALIDAR_FORM_TAREAS,
    DELETE_TAREA,
    SET_TAREA,
    UPDATE_TAREA,
    CLEAN_TAREAS
} from '../../types';

const TaskState = props => {

    const initialState = {
        projectTasks: [],
        errorFormTask: false,
        actualTask: null
    }

    // Crear state y dispatch
    const [state, dispatch] = useReducer(TaskReducer, initialState);

    // Obtiene las tareas de un proyecto
    const getProjectTasks = async projectID => {

        try {
            const response = await clienteAxios.get('/API/tasks', { params: {projectID} });

            dispatch({
                type: TAREAS_PROYECTO,
                payload: response.data
            });

        } catch (error) {
            console.log(error);
        }
    }

    // Añade una nueva tarea
    const addTask = async task => {

        try {

            const response = await clienteAxios.post('/API/tasks', task);

            dispatch({
                type: ADD_TAREA,
                payload: response.data
            });

        } catch (error) {
            console.log(error);
        }

    }

    // Muestra error si el nombre de la tarea esta vacio
    const showError = () => {
        dispatch({
            type: VALIDAR_FORM_TAREAS
        })
    }

    // Borra una tarea por su ID
    const deleteTask = async (taskID, projectID) => {
        try {
            await clienteAxios.delete(`/API/tasks/${taskID}`, { params: { projectID } });

            dispatch({
                type: DELETE_TAREA,
                payload: taskID
            });

        } catch(error) {
            console.log(error);
        }
    }

    // Edita una tarea
    const updateTask = async (task) => {
        
        const response = await clienteAxios.put(`/API/tasks/${task._id}`, task);

        try {

            dispatch({
                type: UPDATE_TAREA,
                payload: response.data
            })

        } catch(error) {
            console.log(error);
        }
    }

    // Selecciona una tarea para editarla
    const setActualTask = task => {
        dispatch({
            type: SET_TAREA,
            payload: task
        })
    }

    // Limpia la lista de tareas al cerrar sesión
    const cleanTasks = () => {
        dispatch({
            type: CLEAN_TAREAS
        })
    }

    return (
        <TaskContext.Provider
            value={{
                projectTasks: state.projectTasks,
                errorFormTask: state.errorFormTask,
                actualTask: state.actualTask,
                getProjectTasks,
                addTask,
                showError,
                deleteTask,
                setActualTask,
                updateTask,
                cleanTasks
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;