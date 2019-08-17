import React from 'react';

import Amplify from 'aws-amplify';
import aws_exports from '../../aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

// Configure
Amplify.configure(aws_exports);

class DashboardComponent extends React.Component {
    render() {
        return (
            <h1>Dashboard</h1>
        );
    }
}

export default withAuthenticator(DashboardComponent, { includeGreetings: true });