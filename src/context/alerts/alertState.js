import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types';

const AlertState = props => {
    const initialState = {
        alert: null
    }

    const [state, dispatch] = useReducer(alertReducer, initialState);

    const handleAlert = (msg, category) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg, 
                category
            }
        })

        // En 3 segundos se va la alerta
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 3000)
    }

    return(
        <AlertContext.Provider
            value={{
                alert: state.alert,
                handleAlert
            }}
        >
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;