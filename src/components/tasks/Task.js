import React, {useContext, createRef} from 'react';
import { MdEdit } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';

import TaskContext from '../../context/tasks/taskContext';
import ProjectContext from '../../context/projects/projectContext';

const Task = ({ task }) => {

    const projectContext = useContext(ProjectContext);
    const { actualProject } = projectContext;

    // Obtener la funcion de borrar tarea del state de tareas
    const tareaContext = useContext(TaskContext);
    const { deleteTask, updateTask, setActualTask, getProjectTasks } = tareaContext;

    // Cambia el estado de una tarea
    const cambiarEstadoTarea = task => {

        if(task.estado) {
            task.estado = false;
        } else {
            task.estado = true;
        }

        updateTask(task);
    }

    // Borra una tarea y las obtiene todas de nuevo
    const deleteTaskAndGet = taskID => {
        deleteTask(taskID, actualProject._id);
        getProjectTasks(actualProject._id);
    }

    return (
        <li className="tarea sombra" ref={createRef()}>
            <p>{task.nombre}</p>

            <div className="estado">
                {
                    task.estado
                        ? (
                            <button
                                type="button"
                                className="completo"
                                onClick={() => cambiarEstadoTarea(task)}
                            >Finalizado</button>
                        )
                        : (
                            <button
                                type="button"
                                className="incompleto"
                                onClick={() => cambiarEstadoTarea(task)}
                            >En curso</button>
                        )
                }
                

            </div>
            <div className="acciones">
            <button
                    type="button"
                    className="btn btn-primario btn-editar"
                    onClick={() => setActualTask(task)}
                ><MdEdit/></button>
                <button
                    type="button"
                    className="btn btn-primario btn-eliminar"
                    onClick={() => deleteTaskAndGet(task._id)}
                ><AiOutlineDelete/></button>
            </div>
        </li>
    );
}

export default Task;