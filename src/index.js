import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import theme from './theme';
import { GlobalStateProvider } from './context/globalState';
import ConfirmProvider from './context/confirmProvider'

ReactDOM.render(
  <SnackbarProvider maxSnack={3}>
    <ThemeProvider theme={theme}>
      <GlobalStateProvider>
        <ConfirmProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConfirmProvider>
      </GlobalStateProvider>
    </ThemeProvider>
  </SnackbarProvider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
