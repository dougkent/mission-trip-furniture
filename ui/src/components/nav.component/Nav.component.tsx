// React
import React from 'react';
import { Link } from 'react-router-dom';

// AWS
import { Authenticator, Greetings } from 'aws-amplify-react';

class NavComponent extends React.Component {
    render() {
        return (
            <header>
                <Link to="/" className="nav-item">
                    Mission Trip Furniture
                </Link>
                <Link to="/plans" className="nav-item">
                    Plans
                </Link>
                <Link to="/my-mtf" className="nav-item">
                    My Account
                </Link>
                <Authenticator hideDefault={true}>
                    <Greetings inGreeting={(username: string) => 'Welcome ' + username} />
                </Authenticator>
            </header>
        );
    }
}

export default NavComponent;