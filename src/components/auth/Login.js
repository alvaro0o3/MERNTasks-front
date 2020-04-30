import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alerts/alertContext';
import { Link } from 'react-router-dom';

const Login = props => {

    // Extraer de AuthContext
    const authContext = useContext(AuthContext);
    const { msg, auth, login } = authContext;

    // Extraer de AlertContext
    const alertContext = useContext(AlertContext);
    const { alert, handleAlert } = alertContext;

    useEffect(() => {

        if(auth) {
            props.history.push('/projects');
        }

        if(msg) {
            handleAlert(msg.msg, msg.category);
        }
        // eslint-disable-next-line
    }, [msg, auth, props.history]);

    // State para iniciar sesión
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const { email, password } = user;

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        // Validacion
        if (email.trim() === '' || password.trim() === '') {
            handleAlert('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        if (password.length < 6) {
            handleAlert('La contraseña debe tener al menos 6 caracteres', 'alerta-error');
            return;
        }

        login(user);
    }

    return (
        <div className="form-usuario">
            {
                alert
                    ? <div className={`alerta ${alert.category}`}>{alert.msg}</div>
                    : null
            }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar sesión</h1>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar sesión"
                        />
                    </div>
                </form>
                <div className="text-center">
                    <p>
                        ¿Aún no tienes una cuenta?  
                    <Link to={'/register'} className="enlace-cuenta">
                              Regístrate
                    </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;