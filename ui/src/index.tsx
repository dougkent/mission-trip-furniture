import React from 'react';
import ReactDOM from 'react-dom';

// Material UI
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

// MTF
import mtfTheme from './theme';
import App from './containers/App';

ReactDOM.render(
    <ThemeProvider theme={mtfTheme}>
        <CssBaseline />
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);
