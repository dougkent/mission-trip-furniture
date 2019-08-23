// React
import React from 'react';

// AWS
import Amplify from 'aws-amplify';
import aws_exports from '../../aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

// MTF
import { signUpConfig } from '../../models/sign-up-config.model';

// Configure
Amplify.configure(aws_exports);

class PlanEditComponent extends React.Component {
    render() {
        return (
            <h1>Plan Name To Edit Goes Here</h1>
        );
    }
}

export default withAuthenticator(PlanEditComponent, {
    signUpConfig: signUpConfig
});