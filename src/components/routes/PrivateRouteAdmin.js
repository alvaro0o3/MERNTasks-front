import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRouteAdmin = ({ component: Component, ...props }) => {

    // Extraer funciones del registro
    const authContext = useContext(AuthContext);
    const { auth, loading, user, getUserAuth } = authContext;

    useEffect(() => {
        getUserAuth();
        // eslint-disable-next-line
    }, [])


    return (
        <Route {...props}
            render={props => !auth && !loading 
                ? (<Redirect to="/" />)
                : (<Component {...props} />)
            }

        />
    )
}

export default PrivateRouteAdmin;