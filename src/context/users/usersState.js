import React, { useReducer } from 'react';

import UsersContext from './usersContext';
import usersReducer from './usersReducer';

import {
    GET_USERS,
    UPDATE_USER
} from '../../types';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'

const UsersState = props => {

    const initialState = {
        users: null
    }

    const [state, dispatch] = useReducer(usersReducer, initialState);

    const getUsers = async () => {
        try {
            const users = await clienteAxios.get('/API/users');

            dispatch({
                type: GET_USERS,
                payload: users.data.users
            })

        } catch (error) {
            console.log(error);
        }
    }


    const updateUser = async user => {
        try {
            await clienteAxios.put(`/API/users/${user._id}`, user);

            dispatch({
                type: UPDATE_USER,
                payload: user
            })

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Perfil actualizado',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <UsersContext.Provider
            value={{
                users: state.users,
                getUsers,
                updateUser
            }}
        >
            {props.children}
        </UsersContext.Provider>
    )
}

export default UsersState;