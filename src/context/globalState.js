import React from 'react'
import _ from 'lodash'
import GlobalContext from './global-context';
import { Progress } from '../components';

// Global State Settings
const initialState = {
    signedIn: false,
    processing: false,
    session: {}
};

const initState = () => {
    let state = _.attempt(JSON.parse.bind(null, localStorage.getItem('state')));
    if (_.isError(state) || !state) {
        state = {
            ...{},
            ...initialState
        };
    }
    return {
        ...state,
        processing: false,
    }
}

const GlobalStateProvider = ({ children }) => {
    const [state, setState] = React.useState(initState);

    const updateState = value => {
        setState({ ...state, ...value })
    };

    const startProcess = () => {
        setState({ ...state, processing: true })
    };

    const endProcess = () => {
        setState({ ...state, processing: false })
    };

    const global = {
        state,
        updateState,
        startProcess,
        endProcess,
    }

    React.useEffect(() => {
        async function checkLogin() {
            // TODO Login Check
        }

        checkLogin()
    }, []); // eslint-disable-line

    React.useEffect(() => {
        localStorage.setItem('state', JSON.stringify(state))
    }, [state]);

    return (
        <GlobalContext.Provider
            value={global}
        >
            {/*  processing start */}
            <Progress processing={state.processing} />
            {/*  processing end */}
            {children}
        </GlobalContext.Provider>
    );
}

export { GlobalStateProvider, initialState }