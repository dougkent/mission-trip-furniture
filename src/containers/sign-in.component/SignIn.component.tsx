// React
import React from 'react';
import { Redirect } from 'react-router-dom';

// AWS
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';

// Material UI
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';

// MTF
import { BaseProps } from '../../models/props';
import { mtfTheme } from '../../themes';

const styles = (theme: Theme) => createStyles({});

export interface SignInProps extends BaseProps, WithStyles<typeof styles> {
    previousUrl: string;
}

class SignIn extends React.Component<SignInProps> {
    render() {
        if (this.props.userId) {
            return <Redirect to={this.props.previousUrl} />;
        } else {
            return (
                <AmplifyAuthenticator>
                    <AmplifySignUp
                        slot='sign-up'
                        formFields={[
                            {
                                type: 'email',
                                required: true,
                            },
                            {
                                type: 'name',
                                label: 'Name',
                                placeholder: 'Enter your name',
                                required: true,
                            },
                            {
                                type: 'username',
                                required: true,
                            },
                            {
                                type: 'password',
                                required: true,
                            },
                        ]}></AmplifySignUp>
                </AmplifyAuthenticator>
            );
        }
    }
}

export default withStyles(styles(mtfTheme))(SignIn);
