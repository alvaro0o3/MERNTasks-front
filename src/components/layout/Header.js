import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import ProjectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';
import Navbar from './Navbar';
import imglogout from '../../../src/logout.png';
import imgeditprofile from '../../../src/user.png';

const Header = () => {

    const projectContext = useContext(ProjectContext);
    const { setActualProject } = projectContext;

    // Extraer funciones de auth para volver a traernos los datos del usuario aunque recargue la pantalla
    const authContext = useContext(AuthContext);
    const { user, logout, getUserAuth } = authContext;

    // Obtener la funcion de limpiar tareas al cerrar sesión
    const tareaContext = useContext(TaskContext);
    const { cleanTasks } = tareaContext;

    useEffect(() => {

        getUserAuth();

        // eslint-disable-next-line
    }, [])

    const handleCLickLogout = () => {
        logout();
        setActualProject(null);
        cleanTasks();
    }

    return (
        <header className="app-header">
            {user ? <p className="nombre-usuario">Hola <span>{user.nombre}</span></p> : null}
            <Navbar />
            <nav className="nav-principal">
                <button
                    className="btn navbtn "
                    //onClick={handleCLickLogout}
                ><i className="fa fa-user-edit"></i></button>
                <button
                    className="btn navbtn "
                    onClick={handleCLickLogout}
                ><i className="fa fa-sign-out-alt"></i></button>
            </nav>
        </header>
    );
}

export default Header;