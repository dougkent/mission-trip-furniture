import mtfTheme from './mtf-mui-theme';

const Container = {
    fontFamily: mtfTheme.typography.fontFamily,
};

const A = {
    color: mtfTheme.palette.secondary.main,
};

const AmazonSignInButton = {
    backgroundColor: mtfTheme.palette.secondary.main,
};

const Button = {
    backgroundColor: mtfTheme.palette.secondary.main,
};

const NavBar = {
    background: 'none',
    border: 'none',
};

const NavButton = {
    background: 'none',
    border: `2px solid ${mtfTheme.palette.secondary.main}`,
    color: mtfTheme.palette.secondary.main,
    fontFamily: mtfTheme.typography.h1.fontFamily,
    fontSize: '1.15rem',
    fontWeight: 400,
    lineHeight: 1,
    minWidth: 'auto',
    padding: '10px 20px',
};

const NavItem = {
    fontFamily: mtfTheme.typography.h1.fontFamily,
    fontSize: '1rem',
    fontWeight: 300,
    lineHeight: 1,
};

const NavRight = {
    textAlign: 'center',
};

const SectionHeader = {
    fontFamily: mtfTheme.typography.h1.fontFamily,
    fontSize: '1.29rem',
    fontWeight: 300,
    lineHeight: 1,
};

const SignInButton = {
    backgroundColor: mtfTheme.palette.secondary.main,
};
const Toast = {
    backgroundColor: mtfTheme.palette.error.main,
    bottom: 0,
    top: 'auto',
};

const mtfAmplifyTheme = {
    container: Container,
    a: A,
    amazonSignInButton: AmazonSignInButton,
    button: Button,
    navBar: NavBar,
    navButton: NavButton,
    navItem: NavItem,
    navRight: NavRight,
    sectionHeader: SectionHeader,
    signInButton: SignInButton,
    toast: Toast,
};

export default mtfAmplifyTheme;
