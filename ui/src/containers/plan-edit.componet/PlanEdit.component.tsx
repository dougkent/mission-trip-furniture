// React
import React from 'react';

// AWS
import Amplify from 'aws-amplify';
import aws_exports from '../../aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

// MTF
import { signUpConfig } from '../../models/sign-up-config.model';
import { AppProps } from '../../models/props';

// Configure
Amplify.configure(aws_exports);

class PlanEditComponent extends React.Component<AppProps, AppProps> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            userId: props.userId,
        };
    }

    componentDidUpdate(prevProps: AppProps) {
        if (this.props.userId !== prevProps.userId) {
            this.setState({ userId: this.props.userId });
        }
    }

    render() {
        return <h1>Plan Name To Edit Goes Here</h1>;
    }
}

export default withAuthenticator(PlanEditComponent, {
    signUpConfig: signUpConfig,
});
