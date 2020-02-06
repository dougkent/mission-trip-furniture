// React
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// AWS
import Amplify, { API, graphqlOperation, Auth, Hub } from 'aws-amplify';
import aws_exports from '../aws-exports';

// Material UI
import { Container } from '@material-ui/core';

// uuid
import { v4 as uuid } from 'uuid';

// MTF
import HomeComponent from './home.component/Home.component';
import PlansListComponent from './plans-list.component/PlansList.component';
import PlanViewComponent from './plan-view.component/PlanView.component';
import Nav from '../components/nav.component/Nav.component';
import DashboardComponent from './dashboard.component/Dashboard.component';
import PlanCreateComponent from './plan-create.component/PlanCreate.component';
import PlanEditComponent from './plan-edit.componet/PlanEdit.component';
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
                    <Route
                        exact
                        path='/'
                        render={() => (
                            <HomeComponent userId={this.state.userId} />
                        )}
                    />
                    <Route
                        exact
                        path='/plans'
                        render={() => (
                            <PlansListComponent userId={this.state.userId} />
                        )}
                    />
                    <Route
                        path='/plans/:planId'
                        render={props => (
                            <PlanViewComponent
                                userId={this.state.userId}
                                planId={props.match.params.planId}
                            />
                        )}
                    />
                    <Route
                        exact
                        path='/my-mtf'
                        render={() => (
                            <DashboardComponent userId={this.state.userId} />
                        )}
                    />
                    <Route
                        exact
                        path='/my-mtf/create-plan'
                        render={() => (
                            <PlanCreateComponent userId={this.state.userId} />
                        )}
                    />
                    <Route
                        path='/my-mtf/plans/:planUrl'
                        render={() => (
                            <PlanEditComponent userId={this.state.userId} />
                        )}
                    />
                </Container>
            </Router>
        );
    }
}

export default App;
