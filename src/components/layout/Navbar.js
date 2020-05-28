import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {

    const authContext = useContext(AuthContext);
    const {user} = authContext;

    if (!user || !user.admin) return null;

    return (
        <div className="navbar">
            <NavLink to={'/projects'}><i className="fa fa-fw fa-home"></i> Home</NavLink>
            <NavLink to={'/users'}><i className="fa fa-fw fa-user"></i> Usuarios</NavLink>
        </div>
    );
}

export default Navbar;