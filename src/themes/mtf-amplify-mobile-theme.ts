import { mtfAmplifyTheme } from './index';

const mtfAmplifyMobileTheme = {
    ...mtfAmplifyTheme,
    navItem: {
        ...mtfAmplifyTheme.navItem,
        display: 'none',
    },
};

export default mtfAmplifyMobileTheme;
