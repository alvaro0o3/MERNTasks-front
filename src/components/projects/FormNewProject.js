import React, { Fragment, useState, useContext } from 'react';
import projectContext from '../../context/projects/projectContext'

const FormNewProject = () => {

    // Obtener el state del formulario
    const proyectoContext = useContext(projectContext);
    const { formNewProject, errorForm, showFormNewProject, addProject, showError } = proyectoContext;

    const [project, setProject] = useState({
        nombre: ''
    });

    const { nombre } = project;

    // Lee los input
    const handleChange = e => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        // Validar
        if (nombre.trim() === '') {
            showError();
            return;
        }

        //showError(false);

        addProject(project);

        setProject({
            nombre: ''
        });
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => showFormNewProject()}
            >
                Nuevo proyecto
            </button>

            {
                formNewProject
                    ?
                    (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Nombre del proyecto"
                                name="nombre"
                                value={nombre}
                                onChange={handleChange}
                            />
                            <input
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar proyecto"
                            />

                        </form>
                    )
                    : null
            }
            {
                errorForm
                    ? <p className="mensaje error">Indica un nombre de Proyecto</p>
                    : null
            }
        </Fragment>
    );
}

export default FormNewProject;