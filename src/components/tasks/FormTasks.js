import React, { useContext, useState, useEffect } from 'react';

import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

const FormTasks = () => {

    // Obtener el proyecto actual, si no hay, no se muestra el form
    const proyectoContext = useContext(projectContext);
    const { actualProject } = proyectoContext;

    // Obtener state y funciones de tareas
    const tareaContext = useContext(TaskContext);
    const { errorFormTask, actualTask, showError, addTask, updateTask, setActualTask } = tareaContext;

    useEffect(() => {
        if (actualTask !== null) {
            setTask(actualTask);
        } else {
            setTask({
                nombre: ''
            })
        }
    }, [actualTask])

    const [task, setTask] = useState({
        nombre: ''
    });

    if (!actualProject) return null;

    const { nombre } = task;

    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value,
            projectID: actualProject._id
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (nombre.trim() === '') {
            showError();
            return;
        }

        if (actualTask === null) {
            addTask(task);
        } else {
            updateTask(task);
            setActualTask(null);
        }

        setTask({
            nombre: ''
        })

    }

    return (
        <div className="formulario">
            <h2>Añadir tareas</h2>
            {
                errorFormTask
                    ? <p class="mensaje error">Indica un nombre para la tarea</p>
                    : null
            }
            <form
                onSubmit={handleSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre de la tarea"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-block btn-submit"
                        value={actualTask ? 'Editar tarea' : 'Añadir tarea'}
                    />
                </div>
            </form>
        </div>
    );
}

export default FormTasks;