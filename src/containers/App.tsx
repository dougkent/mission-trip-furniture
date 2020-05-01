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
import { AppState } from '../models/states';
import {
    GqlQuery,
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
} from '.';
import { Nav } from '../components';
import { PlanFavoriteService } from '../services';

// Configure
Amplify.configure(aws_exports);
ReactGA.initialize('UA-162153255-1');

class App extends React.Component<{}, AppState> {
    private planFavoriteService = new PlanFavoriteService();

    constructor(props: any) {
        super(props);

        this.state = {
            userId: '',
            materials: [],
            tools: [],
            userFavoritedPlanIds: [],
        };
    }

    async setUserId() {
        const userInfo = await Auth.currentUserInfo();

        if (userInfo) {
            this.setState({ userId: userInfo.id });
        }
    }

    async componentDidMount() {
        Hub.listen('auth', (data) => {
            const { payload } = data;
            this.listenToAuthEvents(payload);
        });

        await this.setUserId();
        this.loadMaterialsAndTools();
        this.loadUserFavoritedPlans();
    }

    private async listenToAuthEvents(payload: any) {
        switch (payload.event) {
            case 'signIn':
                await this.createUserIfNotExists();
                this.loadUserFavoritedPlans();

                const userInfo = await Auth.currentUserInfo();
                ReactGA.set({
                    userId: userInfo.id,
                });
                ReactGA.event({ category: 'auth', action: 'User Signed In' });
                break;
            case 'signOut':
                this.setState({ userId: '', userFavoritedPlanIds: [] });
                ReactGA.event({ category: 'auth', action: 'User Signed Out' });
                break;
            case 'signUp':
                ReactGA.event({ category: 'auth', action: 'User Signed Up' });
                break;
        }
    }

    private async userExists(userId: string): Promise<boolean> {
        const userResult: GqlQuery<GetUserQuery> = await API.graphql(
            graphqlOperation(graphQLQueries.getUserIdQuery, { id: userId }),
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
            graphqlOperation(graphQLMutations.createUserMutation, {
                input: createUserInput,
            }),
        );

        const { createUser } = createUserResult.data;

        this.setState({ userId: createUser.id });
    }

    private handleTogglePlanFavorite = async (
        planId: string,
        toggleFavOn: boolean,
    ) => {
        if (toggleFavOn) {
            await this.planFavoriteService.createFavorite(
                planId,
                this.state.userId,
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
                this.state.userId,
            );

            this.setState((prevState) => ({
                ...prevState,
                userFavoritedPlanIds: prevState.userFavoritedPlanIds.filter(
                    (favPlanId) => favPlanId !== planId,
                ),
            }));
        }

        setTimeout(() => this.loadUserFavoritedPlans(), 1000);
    };

    private loadMaterialsAndTools = async () => {
        const materialsResult: GqlQuery<ListMaterialsQuery> = await API.graphql(
            {
                query: graphQLQueries.listMaterialsQuery,
                // @ts-ignore
                authMode: 'AWS_IAM',
            },
        );

        const toolsResult: GqlQuery<ListToolsQuery> = await API.graphql({
            query: graphQLQueries.listToolsQuery,
            // @ts-ignore
            authMode: 'AWS_IAM',
        });

        this.setState((prevState) => ({
            ...prevState,
            materials: materialsResult?.data?.listMaterials?.items.sort(
                (prevMaterial, nextMaterial) =>
                    prevMaterial.name < nextMaterial.name
                        ? -1
                        : prevMaterial.name > nextMaterial.name
                        ? 1
                        : 0,
            ),
            tools: toolsResult?.data?.listTools?.items.sort(
                (prevTool, nextTool) =>
                    prevTool.name < nextTool.name
                        ? -1
                        : prevTool.name > nextTool.name
                        ? 1
                        : 0,
            ),
        }));
    };
    private loadUserFavoritedPlans = async () => {
        if (this.state.userId) {
            const result: GqlQuery<GetFavoriteByUserIdQuery> = await API.graphql(
                graphqlOperation(graphQLQueries.getFavoritesByUserQuery, {
                    userId: this.state.userId,
                }),
            );

            const favoritedPlanIds = result.data.getFavoriteByUserId.items.map(
                (favorite) => favorite.planId,
            );

            this.setState((prevState) => ({
                ...prevState,
                userFavoritedPlanIds: favoritedPlanIds,
            }));
        }
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
                            exact
                            path='/my-mtf'
                            render={() => (
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
                            )}
                        />
                        <Route
                            exact
                            path='/my-mtf/upload-plan'
                            render={() => (
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
