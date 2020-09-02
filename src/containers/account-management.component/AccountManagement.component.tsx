// React
import React from 'react';

// AWS
import { Auth } from 'aws-amplify';

// Material UI
import {
    Typography,
    Theme,
    createStyles,
    WithStyles,
    withStyles,
    Container,
} from '@material-ui/core';

// MTF
import { AppProps } from '../../models/props';
import { mtfTheme } from '../../themes';
import { AccountManagementState } from '../../models/states';
import { PersonalInfo, ChangePassword, ErrorMessage } from '../../components';

const styles = (theme: Theme) =>
    createStyles({
        acctMgmtContainer: {
            marginTop: theme.spacing(4),
        },
        acctMgmtSection: {
            margin: `${theme.spacing(2)}px 0`,
        },
    });
export interface AccountManagementProps
    extends AppProps,
        WithStyles<typeof styles> {}
class AccountManagement extends React.Component<
    AccountManagementProps,
    AccountManagementState
> {
    constructor(props: AccountManagementProps) {
        super(props);

        this.state = {
            email: '',
            emailVerified: true,
            name: '',
            savingPersonalInfo: false,
            savingPassword: false,
            savePasswordSuccessful: false,
            errors: [],
        };
    }

    async componentDidMount() {
        const user = await Auth.currentAuthenticatedUser();

        const { attributes } = user;

        this.setState({
            email: attributes.email,
            name: attributes.name,
            emailVerified: attributes.emailVerified,
        });
    }

    private handleClearErrors = () => {
        this.setState({
            errors: [],
        });
    };

    private handleSetError = (errors: string[]) => {
        this.setState({
            errors: errors,
        });
    };

    private updateUser = async (email: string, name: string) => {
        this.setState({
            savingPersonalInfo: true,
        });

        const user = await Auth.currentAuthenticatedUser();

        Auth.updateUserAttributes(user, {
            email: email,
            name: name,
        })
            .then(async (data) => {
                console.log(data);
                const user = await Auth.currentAuthenticatedUser();

                const { attributes } = user;

                this.setState({
                    savingPersonalInfo: false,
                    email: attributes.email,
                    name: attributes.name,
                    emailVerified: attributes.emailVerified,
                });
            })
            .catch((err) => {
                this.setState({
                    errors: [err.message],
                    savingPersonalInfo: false,
                });
            });
    };

    private updatePassword = async (
        oldPassword: string,
        newPassword: string
    ) => {
        this.setState({
            savingPassword: true,
        });

        const user = await Auth.currentAuthenticatedUser();

        Auth.changePassword(user, oldPassword, newPassword)
            .then(() => {
                this.setState({
                    savingPassword: false,
                    savePasswordSuccessful: true,
                });
            })
            .catch((err) => {
                this.setState({
                    errors: [err.message],
                    savingPassword: false,
                });
            });
    };

    render() {
        const { classes } = this.props;

        return (
            <Container maxWidth='sm' className={classes.acctMgmtContainer}>
                <Typography variant='h2'>Account Management</Typography>
                <div>
                    <div className={classes.acctMgmtSection}>
                        <PersonalInfo
                            email={this.state.email}
                            emailVerified={this.state.emailVerified}
                            name={this.state.name}
                            saving={this.state.savingPersonalInfo}
                            onSave={this.updateUser}
                        />
                    </div>
                    <div className={classes.acctMgmtSection}>
                        <ChangePassword
                            saving={this.state.savingPassword}
                            saveSuccessful={this.state.savePasswordSuccessful}
                            onSave={this.updatePassword}
                            onError={this.handleSetError}
                        />
                    </div>
                </div>
                <ErrorMessage
                    errors={this.state.errors}
                    onClearErrors={this.handleClearErrors}
                />
            </Container>
        );
    }
}

export default withStyles(styles(mtfTheme))(AccountManagement);
