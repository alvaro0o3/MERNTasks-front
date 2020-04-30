import React, { useReducer } from 'react';
import SpinnerContext from './spinnerContext';
import spinnerReducer from './spinnerReducer';
import { SHOW_SPINNER, HIDE_SPINNER } from '../../types';

const SpinnerState = props => {
    const initialState = {
        spinner: false
    }

    const [state, dispatch] = useReducer(spinnerReducer, initialState);

    const showSpinner = () => {

        dispatch({
            type: SHOW_SPINNER
        });

        setTimeout(() => {
            dispatch({
                type: HIDE_SPINNER
            });
        }, 2000)
    }


    return (
        <SpinnerContext.Provider
            value={{
                spinner: state.spinner,
                showSpinner
            }}
        >
            {props.children}
        </SpinnerContext.Provider>
    )
}

export default SpinnerState;