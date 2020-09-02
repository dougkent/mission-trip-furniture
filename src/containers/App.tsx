// React
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

// AWS
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import aws_exports from '../aws-exports';

// Material UI
import { Container } from '@material-ui/core';

// Google Analytics
import ReactGA from 'react-ga';

// MTF
import { AppState } from '../models/states';
import {
    CreateUserInput,
    CreateUserMutation,
    GetFavoriteByUserIdQuery,
    GetUserQuery,
    ListMaterialsQuery,
    ListToolsQuery,
} from '../models/api-models';
import * as graphQLQueries from '../graphql/queries';
import * as graphQLMutations from '../graphql/mutations';
import {
    About,
    Contact,
    CreatePlan,
    Dashboard,
    Home,
    NotFound,
    PlanView,
    PlansList,
    SignIn,
} from '.';
import { Nav } from '../components';
import { PlanFavoriteService } from '../services';
import '../themes/mtf-amplify-theme.css';
import AccountManagement from './account-management.component/AccountManagement.component';

// Configure
Amplify.configure(aws_exports);
ReactGA.initialize('UA-162153255-1');

class App extends React.Component<{}, AppState> {
    private planFavoriteService = new PlanFavoriteService();

    constructor(props: any) {
        super(props);

        this.state = {
            userId: '',
            name: '',
            materials: [],
            tools: [],
            userFavoritedPlanIds: [],
        };
    }

    async setUserId() {
        const userInfo = await Auth.currentUserInfo();

        if (userInfo) {
            const { attributes } = userInfo;
            this.setState({ userId: userInfo.id, name: attributes.name });
        }
    }

    async componentDidMount() {
        onAuthUIStateChange((nextAuthState, authData) => {
            this.listenToAuthEvents(nextAuthState);
        });

        await this.setUserId();
        this.loadMaterialsAndTools();
        this.loadUserFavoritedPlans();
    }

    private async listenToAuthEvents(authState: AuthState) {
        switch (authState) {
            case AuthState.SignedIn:
                await this.createUserIfNotExists();
                this.loadUserFavoritedPlans();

                const userInfo = await Auth.currentUserInfo();
                ReactGA.set({
                    userId: userInfo.id,
                });
                ReactGA.event({ category: 'auth', action: 'User Signed In' });
                break;
            case AuthState.SignedOut:
                this.setState({ userId: '', userFavoritedPlanIds: [] });
                ReactGA.event({ category: 'auth', action: 'User Signed Out' });
                break;
            case AuthState.SigningUp:
                ReactGA.event({ category: 'auth', action: 'User Signed Up' });
                break;
        }
    }

    private async userExists(userId: string): Promise<boolean> {
        const userResult = (await API.graphql(
            graphqlOperation(graphQLQueries.getUserIdQuery, { id: userId })
        )) as GraphQLResult<GetUserQuery>;

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

        var createUserResult = (await API.graphql(
            graphqlOperation(graphQLMutations.createUserMutation, {
                input: createUserInput,
            })
        )) as GraphQLResult<CreateUserMutation>;

        const { createUser } = createUserResult.data;

        this.setState({ userId: createUser.id });
    }

    private handleTogglePlanFavorite = async (
        planId: string,
        toggleFavOn: boolean
    ) => {
        if (toggleFavOn) {
            await this.planFavoriteService.createFavorite(
                planId,
                this.state.userId
            );

            this.setState((prevState) => ({
                ...prevState,
                userFavoritedPlanIds: [
                    ...prevState.userFavoritedPlanIds,
                    planId,
                ],
            }));
        } else {
            await this.planFavoriteService.deleteFavorite(
                planId,
                this.state.userId
            );

            this.setState((prevState) => ({
                ...prevState,
                userFavoritedPlanIds: prevState.userFavoritedPlanIds.filter(
                    (favPlanId) => favPlanId !== planId
                ),
            }));
        }

        setTimeout(() => this.loadUserFavoritedPlans(), 1000);
    };

    private loadMaterialsAndTools = async () => {
        const materialsResult = (await API.graphql({
            query: graphQLQueries.listMaterialsQuery,
            authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
        })) as GraphQLResult<ListMaterialsQuery>;

        const toolsResult = (await API.graphql({
            query: graphQLQueries.listToolsQuery,
            authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
        })) as GraphQLResult<ListToolsQuery>;

        this.setState((prevState) => ({
            ...prevState,
            materials: materialsResult?.data?.listMaterials?.items.sort(
                (prevMaterial, nextMaterial) =>
                    prevMaterial.name < nextMaterial.name
                        ? -1
                        : prevMaterial.name > nextMaterial.name
                        ? 1
                        : 0
            ),
            tools: toolsResult?.data?.listTools?.items.sort(
                (prevTool, nextTool) =>
                    prevTool.name < nextTool.name
                        ? -1
                        : prevTool.name > nextTool.name
                        ? 1
                        : 0
            ),
        }));
    };
    private loadUserFavoritedPlans = async () => {
        if (this.state.userId) {
            const result = (await API.graphql(
                graphqlOperation(graphQLQueries.getFavoritesByUserQuery, {
                    userId: this.state.userId,
                })
            )) as GraphQLResult<GetFavoriteByUserIdQuery>;

            const favoritedPlanIds = result.data.getFavoriteByUserId.items.map(
                (favorite) => favorite.planId
            );

            this.setState((prevState) => ({
                ...prevState,
                userFavoritedPlanIds: favoritedPlanIds,
            }));
        }
    };

    private renderAuthenticatedComponent = (
        component: JSX.Element
    ): JSX.Element => {
        if (this.state.userId) {
            return component;
        } else {
            return (
                <Redirect
                    to={{
                        pathname: '/sign-in',
                        state: {
                            referrer: window.location.pathname,
                        },
                    }}
                />
            );
        }
    };

    render() {
        return (
            <Router>
                <Nav userId={this.state.userId} name={this.state.name} />
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
                                    userFavoritedPlanIds={
                                        this.state.userFavoritedPlanIds
                                    }
                                    onPlanFavorite={
                                        this.handleTogglePlanFavorite
                                    }
                                />
                            )}
                        />
                        <Route
                            path='/plans/:planId'
                            render={(props) => (
                                <PlanView
                                    userId={this.state.userId}
                                    planId={props.match.params.planId}
                                    materials={this.state.materials}
                                    tools={this.state.tools}
                                    userFavoritedPlanIds={
                                        this.state.userFavoritedPlanIds
                                    }
                                    onPlanFavorite={
                                        this.handleTogglePlanFavorite
                                    }
                                />
                            )}
                        />
                        <Route
                            path='/sign-in'
                            render={(props) => (
                                <SignIn
                                    userId={this.state.userId}
                                    previousUrl={
                                        (props.location.state as any)
                                            ?.referrer ?? '/my-mtf'
                                    }
                                />
                            )}
                        />
                        <Route
                            exact
                            path='/my-mtf'
                            render={() =>
                                this.renderAuthenticatedComponent(
                                    <Dashboard
                                        userId={this.state.userId}
                                        materials={this.state.materials}
                                        tools={this.state.tools}
                                        userFavoritedPlanIds={
                                            this.state.userFavoritedPlanIds
                                        }
                                        onPlanFavorite={
                                            this.handleTogglePlanFavorite
                                        }
                                    />
                                )
                            }
                        />
                        <Route
                            exact
                            path='/my-mtf/manage-account'
                            render={() =>
                                this.renderAuthenticatedComponent(
                                    <AccountManagement
                                        userId={this.state.userId}
                                        materials={this.state.materials}
                                        tools={this.state.tools}
                                        userFavoritedPlanIds={
                                            this.state.userFavoritedPlanIds
                                        }
                                        onPlanFavorite={
                                            this.handleTogglePlanFavorite
                                        }
                                    />
                                )
                            }
                        />
                        <Route
                            exact
                            path='/my-mtf/upload-plan'
                            render={() =>
                                this.renderAuthenticatedComponent(
                                    <CreatePlan
                                        userId={this.state.userId}
                                        materials={this.state.materials}
                                        tools={this.state.tools}
                                        userFavoritedPlanIds={
                                            this.state.userFavoritedPlanIds
                                        }
                                        onPlanFavorite={
                                            this.handleTogglePlanFavorite
                                        }
                                    />
                                )
                            }
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
