import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import clienteAxios from '../../config/axios'
import authToken from '../../config/token';
import {
    REGISTRO_OK,
    REGISTRO_ERROR,
    GET_USUARIO,
    LOGIN_OK,
    LOGIN_ERROR,
    CERRAR_SESION,
    SET_USER
} from '../../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'), // JSON Web Token de node obtenido en el registro
        auth: null,
        user: null,
        msg: null,
        loading: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Registro de usuario
    const register = async data => {
        try {
            const response = await clienteAxios.post('/API/users', data);
            

            dispatch({
                type: REGISTRO_OK,
                payload: response.data
            })

            // Obtener datos del usuario
            getUserAuth();

        } catch (error) {
            console.log(error.response); // Mensaje de error del servidor

            const alerta = {
                msg: error.response.data.errors[0].msg,
                category: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    // Devuelve el usuario autenticado
    const getUserAuth = async () => {
        const token = localStorage.getItem('token');

        if(token) {
            // Funcion para enviar token en headers
            authToken(token);
        }

        try {
            const response = await clienteAxios.get('/API/auth');

            dispatch({
                type: GET_USUARIO,
                payload: response.data
            });

        } catch (error) {
            console.log(error.response.data.msg); // Mensaje de error del servidor

        }
    }

    // Iniciar sesión
    const login = async data => {
        try {
            const response = await clienteAxios.post('/API/auth', data);
            
            dispatch({
                type: LOGIN_OK,
                payload: response.data
            })

            // Obtener datos del usuario
            getUserAuth();

        } catch (error) {

            const alerta = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    // Cerrar sesión
    const logout = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    const setUser = user => {
        dispatch({
            type: SET_USER,
            payload: user
        })
    }

    

    return(
        <AuthContext.Provider
            value={{
                token: state.token,
                auth: state.auth,
                user: state.user,
                msg: state.msg,
                loading: state.loading,
                register,
                login,
                getUserAuth,
                logout,
                setUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;