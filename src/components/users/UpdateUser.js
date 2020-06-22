import React, { useState, useContext, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import AuthContext from '../../context/auth/authContext';
import UsersContext from '../../context/users/usersContext';
import AlertContext from '../../context/alerts/alertContext';
import { useHistory } from 'react-router-dom';

const UpdateUser = () => {

    // Extraer funciones de auth para volver a traernos los datos del usuario aunque recargue la pantalla
    const authContext = useContext(AuthContext);
    const { user, getUserAuth, setUser } = authContext;

    // Funciones para editar el usuario
    const usersContext = useContext(UsersContext);
    const { updateUser } = usersContext;

    // Funciones para mostrar alertas
    const alertContext = useContext(AlertContext);
    const { alert, handleAlert } = alertContext;

    const history = useHistory();

    const [userLogged, setUserLogged] = useState(user);

    useEffect(() => {
        getUserAuth();
        // eslint-disable-next-line
    }, [])

    if (!userLogged) {
        history.push('/projects');
        return null;
    };

    const { nombre, apellidos, telefono, empresa, email } = userLogged;

    const handleChange = e => {
        setUserLogged({
            ...userLogged,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(userLogged)
        // Validaciones
        if (nombre.trim() === '' || email.trim() === '') {
            console.log('alerta')
            handleAlert('El nombre de usuario es obligatorio', 'alerta-error');
            return;
        }

        if (telefono.length !== 9 || telefono.length === '') {
            handleAlert('El teléfono debe tener 9 dígitos', 'alerta-error');
            return;
        }

        updateUser(userLogged);
        setUser(userLogged);
        history.push('/projects');

    }

    return (
        <Layout>
            <div className="contenedor-perfil">
                <h2>Edita tu perfil</h2>
                {
                    alert 
                    ? <p className={`alerta ${alert.category}`}>{alert.msg}</p>
                    : null
                }
                <div className="formulario-perfil">
                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="campo-form-perfil">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Nombre"
                                name="nombre"
                                value={nombre}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="campo-form-perfil">
                            <label htmlFor="apellidos">Apellidos</label>
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Apellidos"
                                name="apellidos"
                                value={apellidos}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="campo-form-perfil">
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                type="tel"
                                className="input-text"
                                placeholder="Teléfono"
                                name="telefono"
                                value={telefono}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="campo-form-perfil">
                            <label htmlFor="empresa">Empresa</label>
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Empresa"
                                name="empresa"
                                value={empresa}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="campo-form-perfil">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                disabled
                                className="input-text"
                                placeholder="E-mail"
                                name="email"
                                value={email}
                            />
                            <span>Para cambiar tu e-mail ponte en contacto con tu administrador.</span>
                        </div>
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Actualizar perfil"
                        />
                    </form>
                </div>
            </div>

        </Layout>
    );
}

export default UpdateUser;