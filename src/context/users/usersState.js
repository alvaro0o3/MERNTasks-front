import React, { useReducer } from 'react';

import UsersContext from './usersContext';
import usersReducer from './usersReducer';

import { 
    GET_USERS
} from '../../types';
import clienteAxios from '../../config/axios';

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

        } catch(error) {
            console.log(error);
        }
    }

    return (
        <UsersContext.Provider
            value={{
                users: state.users,
                getUsers
            }}
        >
            {props.children}
        </UsersContext.Provider>
    )
}

export default UsersState;