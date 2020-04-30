import React, { useContext } from 'react';

import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';
import SpinnerContext from '../../context/spinner/spinnerContext';

const Project = ({ project }) => {

    const proyectoContext = useContext(projectContext);
    const {setActualProject} = proyectoContext;

    // Obtener las tareas del proyecto actual del state de tareas
    const tareaContext = useContext(TaskContext);
    const { getProjectTasks } = tareaContext;

    // Control del spinner
    const spinnerContext = useContext(SpinnerContext);
    const { showSpinner } = spinnerContext;


    const { nombre } = project;

    // Selecciona proyecto actual y lista sus tareas
    const seleccionarProyecto = project => {
        showSpinner();
        getProjectTasks(project._id);
        setActualProject(project);
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(project)}
            >
                {nombre}

            </button>
        </li>
    );
}

export default Project;