import React from 'react';
import { useLocation } from 'react-router-dom'
import SidebarUser from './SidebarUser';

const Sidebar = () => {

    let location = useLocation();

    return (
        <aside>
            <h1>MERN<span>Tasks</span></h1>

            {
                location.pathname === '/projects'
                ? <SidebarUser />
                : null
            }

        </aside>
    );
}

export default Sidebar;