import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const mtfTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#3d3d3d',
        },
        secondary: {
            main: '#095b06',
        },
        error: {
            main: red.A200,
        },
        background: {
            default: '#f4f4f6',
        },
    },
    shape: {
        borderRadius: 0,
    },
    typography: {
        fontFamily: '"Ubuntu", sans-serif',
        fontSize: 12,
        h1: {
            fontFamily: '"Rokkitt", serif',
            fontWeight: 300,
            lineHeight: 1,
        },
        h2: {
            fontFamily: '"Rokkitt", serif',
            fontWeight: 300,
            lineHeight: 1,
        },
        h3: {
            fontFamily: '"Rokkitt", serif',
            fontWeight: 300,
            lineHeight: 1,
        },
        h4: {
            fontFamily: '"Rokkitt", serif',
            fontWeight: 300,
            lineHeight: 1,
        },
        h5: {
            fontFamily: '"Rokkitt", serif',
            fontWeight: 300,
            lineHeight: 1,
        },
        h6: {
            fontFamily: '"Rokkitt", serif',
            fontWeight: 300,
            lineHeight: 1,
        },
    },
    overrides: {
        MuiFormLabel: {
            root: {
                color: 'inherit',
            },
        },
    },
});

export default mtfTheme;
