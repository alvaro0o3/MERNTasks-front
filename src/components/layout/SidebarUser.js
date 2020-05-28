import React, { Fragment } from 'react';
import FormNewProject from '../projects/FormNewProject';
import ProjectsList from '../projects/ProjectsList';


const SidebarUser = () => {

    return (

            <Fragment>
                <FormNewProject />

                <div className="proyectos">
                    <h2>Tus proyectos</h2>
                    <ProjectsList />
                </div>
            </Fragment>

    );
}

export default SidebarUser;