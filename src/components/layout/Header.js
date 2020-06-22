import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ProjectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';
import Navbar from './Navbar';

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

    if (!user) return null

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
                <NavLink
                    className="btn navbtn "
                    to={`/update-user/${user._id}`}
                ><i className="fa fa-user-edit"></i></NavLink>
                <button
                    className="btn navbtn "
                    onClick={handleCLickLogout}
                ><i className="fa fa-sign-out-alt"></i></button>
            </nav>
        </header>
    );
}

export default Header;