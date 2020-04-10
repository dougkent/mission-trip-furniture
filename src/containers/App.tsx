// React
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// AWS
import Amplify, { API, graphqlOperation, Auth, Hub } from 'aws-amplify';
import aws_exports from '../aws-exports';

// Material UI
import { Container } from '@material-ui/core';

// Google Analytics
import ReactGA from 'react-ga';

// MTF
import { AppProps } from '../models/props';
import {
    GqlQuery,
    CreateUserInput,
    CreateUserMutation,
    GetUserQuery,
    ListMaterialsQuery,
    ListToolsQuery,
} from '../models/api-models';
import * as graphQLQueries from '../graphql/queries';
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
ReactGA.initialize('UA-162153255-1');

class App extends React.Component<{}, AppProps> {
    constructor(props: any) {
        super(props);

        this.state = {
            userId: '',
            materials: [],
            tools: [],
        };

        this.setUserId();
        this.loadMaterials();
        this.loadTools();
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

                const userInfo = await Auth.currentUserInfo();
                ReactGA.set({
                    userId: userInfo.id,
                });
                ReactGA.event({ category: 'auth', action: 'User Signed In' });
                break;
            case 'signOut':
                this.setState({ userId: '' });
                ReactGA.event({ category: 'auth', action: 'User Signed Out' });
                break;
            case 'signUp':
                ReactGA.event({ category: 'auth', action: 'User Signed Up' });
                break;
        }
    }

    private async userExists(userId: string): Promise<boolean> {
        const userResult: GqlQuery<GetUserQuery> = await API.graphql(
            graphqlOperation(graphQLQueries.getUserIdQuery, { id: userId })
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
            graphqlOperation(graphQLQueries.createUserMutation, {
                input: createUserInput,
            })
        );

        const { createUser } = createUserResult.data;

        this.setState({ userId: createUser.id });
    }

    private loadMaterials = async () => {
        const result: GqlQuery<ListMaterialsQuery> = await API.graphql({
            query: graphQLQueries.listMaterialsQuery,
            // @ts-ignore
            authMode: 'AWS_IAM',
        });

        this.setState(prevState => ({
            ...prevState,
            materials: result?.data?.listMaterials?.items,
        }));
    };

    private loadTools = async () => {
        const result: GqlQuery<ListToolsQuery> = await API.graphql({
            query: graphQLQueries.listToolsQuery,
            // @ts-ignore
            authMode: 'AWS_IAM',
        });

        this.setState(prevState => ({
            ...prevState,
            tools: result?.data?.listTools?.items,
        }));
    };

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
                                <PlansList
                                    userId={this.state.userId}
                                    materials={this.state.materials}
                                    tools={this.state.tools}
                                />
                            )}
                        />
                        <Route
                            path='/plans/:planId'
                            render={props => (
                                <PlanView
                                    userId={this.state.userId}
                                    planId={props.match.params.planId}
                                    materials={this.state.materials}
                                    tools={this.state.tools}
                                />
                            )}
                        />
                        <Route
                            exact
                            path='/my-mtf'
                            render={() => (
                                <Dashboard
                                    userId={this.state.userId}
                                    materials={this.state.materials}
                                    tools={this.state.tools}
                                />
                            )}
                        />
                        <Route
                            exact
                            path='/my-mtf/create-plan'
                            render={() => (
                                <CreatePlan
                                    userId={this.state.userId}
                                    materials={this.state.materials}
                                    tools={this.state.tools}
                                />
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
