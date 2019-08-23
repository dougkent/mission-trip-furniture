// React
import React from 'react';
import { Link } from 'react-router-dom';

// AWS
import Amplify from 'aws-amplify';
import aws_exports from '../../aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

// MTF
import { signUpConfig } from '../../models/sign-up-config.model';

// Configure
Amplify.configure(aws_exports);

class DashboardComponent extends React.Component {
    render() {
        return (
            <div>
                <h1>My Plans</h1>
                <h1>Favorited Plans</h1>
                <Link to="/my-mtf/create-plan" className="nav-item">
                    Create Plan
                </Link>
            </div>
        );
    }
}

export default withAuthenticator(DashboardComponent, {
    signUpConfig: signUpConfig
});