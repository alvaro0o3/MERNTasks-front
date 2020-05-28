import React from 'react';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';

const Layout = props => {
    return (
        <div className="contenedor-app">

            <Sidebar />

            <div className="seccion-principal">

                <Header />

                <main>
                    {props.children}
                </main>

            </div>
        </div>
    );
}

export default Layout;