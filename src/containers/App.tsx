// React
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// AWS
import Amplify, { API, graphqlOperation, Auth, Hub } from 'aws-amplify';
import aws_exports from '../aws-exports';

// Material UI
import { Container } from '@material-ui/core';

// MTF
import { AppProps } from '../models/props';
import {
    GqlQuery,
    CreateUserInput,
    GetUserQuery,
    CreateUserMutation,
} from '../models/api-models';
import {
    About,
    Contact,
    CreatePlan,
    Dashboard,
    Home,
    NotFound,
    PlanView,
    PlansList,
} from '.';
import { Nav } from '../components';

// Configure
Amplify.configure(aws_exports);

class App extends React.Component<{}, AppProps> {
    private getUserQuery = `query GetUser($id: ID!) {
        getUser(id: $id) {
            id
        }
    }`;

    private createUserMutation = `mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id
        }
    }`;

    constructor(props: any) {
        super(props);

        this.state = {
            userId: '',
        };

        this.setUserId();
    }

    async setUserId() {
        const userInfo = await Auth.currentUserInfo();

        if (userInfo) {
            this.setState({ userId: userInfo.id });
        }
    }

    async componentDidMount() {
        Hub.listen('auth', data => {
            const { payload } = data;
            this.listenToAuthEvents(payload);
        });
    }

    private async listenToAuthEvents(payload: any) {
        switch (payload.event) {
            case 'signIn':
                await this.createUserIfNotExists();
                break;
            case 'signOut':
                this.setState({ userId: '' });
                break;
        }
    }

    private async userExists(userId: string): Promise<boolean> {
        const userResult: GqlQuery<GetUserQuery> = await API.graphql(
            graphqlOperation(this.getUserQuery, { id: userId })
        );

        const { getUser } = userResult.data;

        return !!getUser;
    }

    private async createUserIfNotExists() {
        const userInfo = await Auth.currentUserInfo();

        if (!(await this.userExists(userInfo.id))) {
            await this.createUserByUsername(userInfo.id, userInfo.username);
        } else {
            this.setState({ userId: userInfo.id });
        }
    }

    private async createUserByUsername(id: string, username: string) {
        var createUserInput: CreateUserInput = {
            id: id,
            username: username,
        };

        var createUserResult: GqlQuery<CreateUserMutation> = await API.graphql(
            graphqlOperation(this.createUserMutation, {
                input: createUserInput,
            })
        );

        const { createUser } = createUserResult.data;

        this.setState({ userId: createUser.id });
    }

    render() {
        return (
            <Router>
                <Nav userId={this.state.userId} />
                <Container maxWidth='xl'>
                    <Switch>
                        <Route
                            exact
                            path='/'
                            render={() => <Home userId={this.state.userId} />}
                        />
                        <Route
                            exact
                            path='/about'
                            render={() => <About userId={this.state.userId} />}
                        />
                        <Route
                            exact
                            path='/contact'
                            render={() => (
                                <Contact userId={this.state.userId} />
                            )}
                        />
                        <Route
                            exact
                            path='/plans'
                            render={() => (
                                <PlansList userId={this.state.userId} />
                            )}
                        />
                        <Route
                            path='/plans/:planId'
                            render={props => (
                                <PlanView
                                    userId={this.state.userId}
                                    planId={props.match.params.planId}
                                />
                            )}
                        />
                        <Route
                            exact
                            path='/my-mtf'
                            render={() => (
                                <Dashboard userId={this.state.userId} />
                            )}
                        />
                        <Route
                            exact
                            path='/my-mtf/create-plan'
                            render={() => (
                                <CreatePlan userId={this.state.userId} />
                            )}
                        />
                        <Route
                            path='*'
                            render={() => (
                                <NotFound userId={this.state.userId} />
                            )}
                        />
                    </Switch>
                </Container>
            </Router>
        );
    }
}

export default App;
