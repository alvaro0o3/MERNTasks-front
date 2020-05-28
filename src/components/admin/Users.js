import React, { useEffect, useContext } from 'react';
import Layout from '../layout/Layout';
import MUIDataTable from "mui-datatables";
import AuthContext from '../../context/auth/authContext';
import UsersContext from '../../context/users/usersContext';

const Users = props => {

    // Extraer funciones de auth para volver a traernos los datos del usuario aunque recargue la pantalla
    const authContext = useContext(AuthContext);
    const { user, getUserAuth } = authContext;

    // Extraer funciones de auth para volver a traernos los datos del usuario aunque recargue la pantalla
    const usersContext = useContext(UsersContext);
    const { users, getUsers } = usersContext;


    if (!user) {
        props.history.push('/')
    }

    useEffect(() => {

        getUserAuth();
        getUsers();
        // eslint-disable-next-line
    }, [])

    if (!users || !user.admin) return null;

    const columns = [
        {
            name: "nombre",
            label: "Nombre",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "email",
            label: "Email",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "fecharegistro",
            label: "Fecha de registro",
            options: {
                filter: true,
                sort: false,
            }
        }
    ];

    const data = users;

    const options = {
        filterType: 'checkbox',
        selectableRows: 'none',
        disableToolbarSelect: true
    };

    return (
        <Layout>

            <div className="container table-container">
                <MUIDataTable
                    title={"Usuarios"}
                    data={data}
                    columns={columns}
                    options={options}
                />
            </div>

        </Layout>
    );
}

export default Users;