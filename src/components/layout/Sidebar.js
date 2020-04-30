import React from 'react';
import FormNewProject from '../projects/FormNewProject';
import ProjectsList from '../projects/ProjectsList';

const Sidebar = () => {
    return (
        <aside>
            <h1>MERN<span>Tasks</span></h1>

            <FormNewProject />

            <div className="proyectos">
                <h2>Tus proyectos</h2>
                <ProjectsList />
            </div>
        </aside>
    );
}

export default Sidebar;