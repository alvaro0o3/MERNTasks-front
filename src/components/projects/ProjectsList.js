import React, { useContext, useEffect } from 'react';
import Project from './Project';

import ProjectContext from '../../context/projects/projectContext'
import AlertContext from '../../context/alerts/alertContext';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ProjectsList = () => {

    // Obtener el state de los proyectos
    const projectContext = useContext(ProjectContext);
    const { projects, message, getProjects } = projectContext;

    // Obtener el state de alertas
    const alertContext = useContext(AlertContext);
    const { alert, handleAlert } = alertContext;

    // Obtener los proyectos cuando carga el componente
    useEffect(() => {
        if(message) {
            handleAlert(message.msg, message.category);
        }
        getProjects();
        // eslint-disable-next-line
    }, [message]);

    // Si no hay proyectos se muestra un mensaje
    if (projects.length === 0) {
        return <p className="text-center info">Todavía no tienes proyectos ¡Comienza creando tu primer proyecto!</p>;
    }

    return (
        <ul className="listado-proyectos">
            {
                alert
                    ? <div className={`alerta ${alert.category}`}>{alert.msg}</div>
                    : null
            }
            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Project
                            project={project}

                        />
                    </CSSTransition>

                ))}
            </TransitionGroup>

        </ul>
    );
}

export default ProjectsList;