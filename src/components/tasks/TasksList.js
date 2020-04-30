import React, { Fragment, useContext } from 'react';
import Task from './Task';
import Spinner from '../layout/Spinner';

import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';
import SpinnerContext from '../../context/spinner/spinnerContext';

const TasksList = () => {

    // Obtener el proyecto actual del state de los proyectos
    const proyectoContext = useContext(projectContext);
    const { actualProject, deleteProject } = proyectoContext;

    // Obtener las tareas del proyecto actual del state de tareas
    const tareaContext = useContext(TaskContext);
    const { projectTasks } = tareaContext;

    // Control del spinner
    const spinnerContext = useContext(SpinnerContext);
    const { spinner } = spinnerContext;

    if (!actualProject) return <h2>Selecciona un proyecto</h2>;

    return (
        <Fragment>
            <h2>Proyecto: {actualProject.nombre}</h2>

            <ul className="listado-tareas">
                {

                    spinner
                        ? <Spinner />
                        : projectTasks.length === 0
                            ? (<li className="tarea"><p>No hay tareas</p></li>)
                            :
                            (
                                projectTasks.map(task => (

                                    <Task
                                        task={task}
                                        key={task._id}
                                        className="tarea"
                                    />

                                ))
                            )

                }


            </ul>
            <div className="text-center">
                <button
                    type="button"
                    className="btn btn-eliminar btn-primario"
                    onClick={() => deleteProject(actualProject._id)}
                >
                    Eliminar proyecto &times;
                </button>
            </div>


        </Fragment>
    );
}

export default TasksList;