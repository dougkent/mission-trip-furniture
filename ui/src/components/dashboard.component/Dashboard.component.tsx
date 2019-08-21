// React
import React from 'react';

// AWS
import Amplify from 'aws-amplify';
import aws_exports from '../../aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

// MTF
import NavComponent from '../nav.component/Nav.component';

// Configure
Amplify.configure(aws_exports);

const signUpConfig = {
    hideAllDefaults: true,
    signUpFields: [
        {
            label: 'Email',
            key: 'email',
            required: true,
            displayOrder: 1,
            type: 'string',
        },

        {
            label: 'Name',
            key: 'name',
            required: true,
            displayOrder: 2,
            type: 'string',
        },
        {
            label: 'Username',
            key: 'username',
            required: true,
            displayOrder: 3,
            type: 'string',
        },
        {
            label: 'Password',
            key: 'password',
            required: true,
            displayOrder: 4,
            type: 'password',
        }
    ]
}

class DashboardComponent extends React.Component {
    render() {
        return (
            <div>
                <NavComponent />
                <h1>
                    Dashboard
                </h1>
            </div>
        );
    }
}

export default withAuthenticator(DashboardComponent, {
    signUpConfig: signUpConfig
});