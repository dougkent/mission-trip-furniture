// React
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// AWS
import Amplify, { API, graphqlOperation, Auth, Hub } from 'aws-amplify';
import aws_exports from '../aws-exports';

// uuid
import { v4 as uuid } from 'uuid';

// MTF
import './App.scss';
import HomeComponent from './home.component/Home.component';
import PlansListComponent from './plans-list.component/PlansList.component';
import PlanViewComponent from './plan-view.component/PlanView.component';
import Nav from '../components/nav.component/Nav.component';
import DashboardComponent from './dashboard.component/Dashboard.component';
import PlanCreateComponent from './plan-create.component/PlanCreate.component';
import PlanEditComponent from './plan-edit.componet/PlanEdit.component';
import { AppProps } from '../models/props';
import {
    CreateUserInput,
    GetUserByUsernameQuery,
    CreateUserMutation,
} from '../models/api.models';

// Configure
Amplify.configure(aws_exports);

interface UserId {
    id: string;
}

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
        const user = await Auth.currentAuthenticatedUser();

        var userId = await this.tryGetUserId(user.username);

        if (userId) {
            this.setState({ userId: userId });
        }
    }

    async componentDidMount() {
        const user = await Auth.currentAuthenticatedUser();

        Hub.listen('auth', data => {
            const { payload } = data;
            this.listenToAuthEvents(payload, user.username);
        });
    }

    private async listenToAuthEvents(payload: any, username: string) {
        switch (payload.event) {
            case 'signIn':
                await this.createUserIfNotExists(username);
                break;
        }
    }

    private async tryGetUserId(username: string): Promise<string> {
        const userResult: { data: GetUserByUsernameQuery } = await API.graphql(
            graphqlOperation(this._getUserQuery, { username: username })
        );

        const { getUserByUsername } = userResult.data;

        if (getUserByUsername.items.length) {
            return getUserByUsername.items[0].id;
        } else {
            return null;
        }
    }

    private async createUserIfNotExists(username: string) {
        const userId = await this.tryGetUserId(username);

        if (!userId) {
            await this.createUserByUsername(username);
        } else {
            this.setState({ userId: userId });
        }
    }

    private async createUserByUsername(username: string) {
        var createUserInput: CreateUserInput = {
            id: uuid(),
            username: username,
        };

        var createUserResult: { data: CreateUserMutation } = await API.graphql(
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
                <div className='container'>
                    <Nav />
                    <Route
                        exact
                        path='/'
                        render={() => (
                            <HomeComponent userId={this.state.userId} />
                        )}
                    />
                    <Route exact path='/plans' component={PlansListComponent} />
                    <Route
                        path='/plans/:planUrl'
                        component={PlanViewComponent}
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
                        component={PlanCreateComponent}
                    />
                    <Route
                        path='/my-mtf/plans/:planUrl'
                        component={PlanEditComponent}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
