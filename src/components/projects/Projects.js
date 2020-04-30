import React, {useContext, useEffect} from 'react';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
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
        <div className="contenedor-app">
            
            <Sidebar/>

            <div className="seccion-principal">

                <Header />

                <main>

                    <FormTasks />
                    
                    <div className="contenedor-tareas">
                        <TasksList />
                    </div>
                </main>

            </div>
        </div>
    );
}

export default Projects;