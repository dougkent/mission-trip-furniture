// React
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// AWS
import Amplify, { API, graphqlOperation, Auth, Hub } from 'aws-amplify';
import aws_exports from '../aws-exports';

// Material UI
import { Container } from '@material-ui/core';

// MTF
import Home from './home.component/Home.component';
import About from './about.component/About.component';
import Contact from './contact.component/Contact.component';
import PlansList from './plans-list.component/PlansList.component';
import PlanView from './plan-view.component/PlanView.component';
import Nav from '../components/nav.component/Nav.component';
import Dashboard from './dashboard.component/Dashboard.component';
import CreatePlan from './plan-create.component/PlanCreate.component';
import NotFound from './not-found.component/NotFound.component';
import { AppProps } from '../models/props';
import {
    GqlQuery,
    CreateUserInput,
    GetUserByUsernameQuery,
    CreateUserMutation,
} from '../models/api-models';

// Configure
Amplify.configure(aws_exports);

class App extends React.Component<{}, AppProps> {
    private _getUserQuery = `query GetUserByUsername($username: String!) {
        getUserByUsername(username: $username) {
            items {
                id
            }
        }
    }`;

    private _createUserMutation = `mutation CreateUser($input: CreateUserInput!) {
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
            var userId = await this.tryGetUserId(userInfo.username);

            if (userId) {
                this.setState({ userId: userId });
            }
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

    private async tryGetUserId(username: string): Promise<string> {
        const userResult: GqlQuery<GetUserByUsernameQuery> = await API.graphql(
            graphqlOperation(this._getUserQuery, { username: username })
        );

        const { getUserByUsername } = userResult.data;

        if (getUserByUsername.items.length) {
            return getUserByUsername.items[0].id;
        } else {
            return null;
        }
    }

    private async createUserIfNotExists() {
        const user = await Auth.currentUserInfo();

        const userId = await this.tryGetUserId(user.username);

        if (!userId) {
            await this.createUserByUsername(user.id, user.username);
        } else {
            this.setState({ userId: userId });
        }
    }

    private async createUserByUsername(id: string, username: string) {
        var createUserInput: CreateUserInput = {
            id: id,
            username: username,
        };

        var createUserResult: GqlQuery<CreateUserMutation> = await API.graphql(
            graphqlOperation(this._createUserMutation, {
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