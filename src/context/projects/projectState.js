import React, { useReducer } from 'react';

import ProjectContext from './projectContext';
import projectReducer from './projectReducer';

import { 
    FORMULARIO_PROYECTO, 
    GET_PROYECTOS, 
    ADD_PROYECTO,
    VALIDAR_FORMULARIO,
    SET_PROYECTO,
    DELETE_PROYECTO,
    ERROR_PROYECTO // Errores del servidor
} from '../../types';
import clienteAxios from '../../config/axios';

const ProjectState = props => {

    const initialState = {
        projects: [],
        formNewProject: false, // Controla si se muestra/oculta el form de nuevo proyecto
        errorForm: false,
        actualProject: null,
        message: null // Errores
    }

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(projectReducer, initialState);

    const showFormNewProject = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    // Obtener los proyectos
    const getProjects = async () => {
        
        try {

            const response = await clienteAxios.get('/API/projects');

            dispatch({
                type: GET_PROYECTOS,
                payload: response.data.projects
            });

        } catch(error) {

            const alerta = {
                msg: 'Hubo un error inesperado',
                category: 'alerta-error'
            }
            
            dispatch({
                type: ERROR_PROYECTO,
                payload: alerta
            })
        }
    }

    // Agregar nuevo proyecto
    const addProject = async project => {

        try {

            const response = await clienteAxios.post('/API/projects', project);

            dispatch({
                type: ADD_PROYECTO,
                payload: response.data
            })

        } catch(error) {

            const alerta = {
                msg: 'Hubo un error inesperado',
                category: 'alerta-error'
            }
            
            dispatch({
                type: ERROR_PROYECTO,
                payload: alerta
            })
        }
    }

    // Validación formulario nuevo proyecto
    const showError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    // al seleccionar un proyecto de la lista
    const setActualProject = project => {
        dispatch({
            type: SET_PROYECTO,
            payload: project
        })
    }

    // Elimina un proyecto
    const deleteProject = async projectID => {
        
        try {

            const response = await clienteAxios.delete(`API/projects/${projectID}`);

            dispatch({
                type: DELETE_PROYECTO,
                payload: projectID
            });

        } catch(error) {

            const alerta = {
                msg: 'Hubo un error inesperado',
                category: 'alerta-error'
            }
            
            dispatch({
                type: ERROR_PROYECTO,
                payload: alerta
            })
        }
    }

    return (
        <ProjectContext.Provider
            value={{
                projects: state.projects,
                formNewProject: state.formNewProject,
                errorForm: state.errorForm,
                actualProject: state.actualProject,
                message: state.message,
                showFormNewProject,
                getProjects,
                addProject,
                showError,
                setActualProject,
                deleteProject
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    )
}

export default ProjectState;