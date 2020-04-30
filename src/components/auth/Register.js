import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';


const Register = (props) => {

    // Extraer valores del context
    const alertContext = useContext(AlertContext);
    const { alert, handleAlert } = alertContext;

    // Extraer funciones del registro
    const authContext = useContext(AuthContext);
    const { msg, auth, register } = authContext;

    useEffect(() => {
        if(auth) {
            props.history.push('/projects');
        }

        if(msg) {
            handleAlert(msg.msg, msg.category);
        }
        // eslint-disable-next-line
    }, [msg, auth, props.history])

    // State para iniciar sesión
    const [newuser, setNewUser] = useState({
        nombre: '',
        email: '',
        password: '',
        passwordconfirm: ''
    })

    const { nombre, email, password, passwordconfirm } = newuser;

    const handleChange = e => {
        setNewUser({
            ...newuser,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        // Validaciones
        if (nombre.trim() === '' || email.trim() === '' || password.trim() === '' || passwordconfirm.trim() === '') {
            handleAlert('Todos los campos son obligatorios', 'alerta-error');
            return;
        } 

        if (password.length < 6 || passwordconfirm.length < 6) {
            handleAlert('La contraseña debe tener al menos 6 caracteres', 'alerta-error');
            return;
        }

        if (password !== passwordconfirm) {
            handleAlert('Las contraseñas no coinciden', 'alerta-error');
            return;
        }

        // Registrar usuario
        register({
            nombre,
            email,
            password
        });
    }

    return (
        <div className="form-usuario">
            {
                alert
                    ? <div className={`alerta ${alert.category}`}>{alert.msg}</div>
                    : null
            }
            <div className="contenedor-form sombra-dark">
                <h1>Registro</h1>

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        {/* <label htmlFor="nombre">Nombre</label> */}
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        {/* <label htmlFor="email">Email</label> */}
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
                        {/* <label htmlFor="password">Contraseña</label> */}
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
                        {/* <label htmlFor="passwordconfirm">Repite la contraseña</label> */}
                        <input
                            type="password"
                            id="passwordconfirm"
                            name="passwordconfirm"
                            placeholder="Repite la contraseña"
                            value={passwordconfirm}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Crear cuenta"
                        />
                    </div>
                </form>
                <div className="text-center">
                    <p>
                        <Link to={'/'} className="enlace-cuenta">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;