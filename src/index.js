import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger'
import {Provider} from 'react-redux';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
    palette: {
        primary: {
            contrastText: '#fff',
            light: green[300],
            main: green[500],
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
        type: 'light',
    },
});

const loggerMiddleware = createLogger()
const store = createStore(reducers, applyMiddleware(thunkMiddleware, loggerMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App/>
        </MuiThemeProvider>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
