import React, { useContext, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import FormTasks from '../tasks/FormTasks';
import TasksList from '../tasks/TasksList';
import AuthContext from '../../context/auth/authContext';

const Projects = () => {

    // Extraer funciones de auth para volver a traernos los datos del usuario aunque recargue la pantalla
    const authContext = useContext(AuthContext);
    const { getUserAuth } = authContext;

    useEffect(() => {

        getUserAuth();

        // eslint-disable-next-line
    }, [])

    return (
        <Layout>
            <FormTasks />

            <div className="contenedor-tareas">
                <TasksList />
            </div>
        </Layout>
    );
}

export default Projects;