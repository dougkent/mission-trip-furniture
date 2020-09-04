// React
import React from 'react';
import { Redirect } from 'react-router-dom';

// AWS
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api';
import { AmplifyS3Image } from '@aws-amplify/ui-react';
import { AccessLevel } from '@aws-amplify/ui-components';

// Material UI
import {
    CircularProgress,
    createStyles,
    IconButton,
    Menu,
    MenuItem,
    Theme,
    Typography,
    withStyles,
    WithStyles,
} from '@material-ui/core';
import MoreVertSharpIcon from '@material-ui/icons/MoreVertSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp';

// uuid
import { v4 as uuid } from 'uuid';

// Google Analytics
import ReactGA from 'react-ga';

// MTF
import { AppProps } from '../../models/props';
import { ViewPlanState } from '../../models/states';
import { mtfTheme } from '../../themes';
import NotFound from '../not-found.component/NotFound.component';
import {
    DownloadButton,
    ErrorMessage,
    PlanDate,
    PlanDelete,
    PlanFavorite,
    PlanDownloadedCount,
    PlanDetails,
} from '../../components';
import {
    CreateDownloadInput,
    DeletePlanInput,
    DeletePlanMutation,
    GetDownloadByPlanIdQuery,
    GetFavoriteByPlanIdQuery,
    GetPlanQuery,
    ModelIdKeyConditionInput,
    Plan,
    UpdateDownloadInput,
    UpdatePlanInput,
    UpdatePlanMutation,
} from '../../models/api-models';
import * as graphQLQueries from '../../graphql/queries';
import * as graphQLMutations from '../../graphql/mutations';
import { EditPlan } from '../../models';

const styles = (theme: Theme) =>
    createStyles({
        loading: {
            margin: `${theme.spacing(4)}px auto`,
            width: theme.spacing(12),
        },
        viewPlanContainer: {
            marginTop: theme.spacing(4),
            display: 'flex',
            flexWrap: 'wrap',
        },
        title: {
            width: '100%',
            marginBottom: theme.spacing(1),
            display: 'flex',
            justifyContent: 'space-between',
        },
        subTitle: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        image: {
            width: '100%',
            height: '100%',
            marginBottom: theme.spacing(2),
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            [theme.breakpoints.up('sm')]: {
                width: '50%',
            },
            '& amplify-s3-image': {
                '--width': '100%',
                width: '100%',
                height: theme.spacing(25),
                objectFit: 'cover',
                [theme.breakpoints.up('lg')]: {
                    height: '700px',
                },
            },
        },
        planContent: {
            width: '100%',
            padding: 0,
            marginBottom: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                padding: `0 ${theme.spacing(3)}px`,
                width: '50%',
            },
        },
        row: {
            width: '100%',
            flexGrow: 1,
            marginBottom: `${theme.spacing(2)}px`,
            display: 'flex',
        },
        descriptionTitle: {
            marginTop: theme.spacing(3),
        },
        description: {
            whiteSpace: 'pre-line',
        },
        buttonRow: {
            marginTop: theme.spacing(2),
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            [theme.breakpoints.up('md')]: {
                justifyContent: 'flex-start',
            },
        },
        butonRowIcons: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: theme.spacing(10),
        },
        lastDownloadedRow: {
            marginTop: theme.spacing(1),
        },
    });

export interface ViewPlanProps extends AppProps, WithStyles<typeof styles> {
    planId: string;
}
class PlanView extends React.Component<ViewPlanProps, ViewPlanState> {
    constructor(props: ViewPlanProps) {
        super(props);

        this.state = {
            userId: props.userId,
            materials: props.materials,
            tools: props.tools,
            userFavoritedPlanIds: props.userFavoritedPlanIds,
            planId: props.planId,
            planDownload: null,
            plan: null,
            downloadUrl: null,
            loading: true,
            planMenuAnchor: null,
            editing: false,
            saving: false,
            deleteDialogOpen: false,
            deleteComplete: false,
            errors: [],
        };
    }

    componentDidMount = async () => {
        const planResult = (await API.graphql({
            query: graphQLQueries.getPlanQuery,
            variables: { id: this.props.planId },
            authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
        })) as GraphQLResult<GetPlanQuery>;

        if (planResult?.data?.getPlan) {
            const { getPlan } = planResult.data;

            const decoratedPlan = this.decoratePlan(getPlan);

            const downloadUrl = await Storage.get(getPlan.pdfS3Key, {
                level: 'protected',
                identityId: getPlan.createdBy.id,
            });

            this.setState({
                planId: this.props.planId,
                plan: decoratedPlan,
                downloadUrl: downloadUrl as string,
                loading: false,
            });

            if (this.props.userId) {
                const getPlanDownloadInput: ModelIdKeyConditionInput = {
                    eq: this.props.userId,
                };

                const planDownloadResult = (await API.graphql(
                    graphqlOperation(
                        graphQLQueries.getDownloadByPlanAndUserQuery,
                        {
                            planId: this.props.planId,
                            userId: getPlanDownloadInput,
                        }
                    )
                )) as GraphQLResult<GetDownloadByPlanIdQuery>;

                if (
                    planDownloadResult?.data?.getDownloadByPlanId?.items.length
                ) {
                    this.setState({
                        planDownload:
                            planDownloadResult?.data?.getDownloadByPlanId
                                ?.items[0],
                    });
                }
            }
        } else {
            this.setState({
                loading: false,
            });
        }

        ReactGA.ga('send', 'pageview', window.location.pathname);
    };

    componentDidUpdate = async (prevProps: ViewPlanProps) => {
        if (
            this.props.userId !== prevProps.userId ||
            this.props.materials !== prevProps.materials ||
            this.props.tools !== prevProps.tools ||
            this.props.userFavoritedPlanIds !== prevProps.userFavoritedPlanIds
        ) {
            await this.setState({
                userId: this.props.userId,
                materials: this.props.materials,
                tools: this.props.tools,
                userFavoritedPlanIds: this.props.userFavoritedPlanIds,
            });

            const decoratedPlan = this.decoratePlan(this.state.plan);

            this.setState({
                plan: decoratedPlan,
            });
        }
    };

    private decoratePlan = (plan: Plan): Plan => {
        return {
            ...plan,
            requiredMaterials: this.state.materials.filter((material) => {
                return !!plan.requiredMaterialIds.find(
                    (id) => id === material.id
                );
            }),
            requiredTools: this.state.tools.filter((tool) => {
                return !!plan.requiredToolIds.find((id) => id === tool.id);
            }),
            isFavoritedByUser: this.state.userFavoritedPlanIds.some(
                (planId) => planId === plan.id
            ),
        };
    };

    private getLastDownloadedDate = (): string => {
        const utcString = this.state.planDownload.downloadedAt[
            this.state.planDownload.downloadedAt.length - 1
        ];

        const utcDate = new Date(utcString);

        return utcDate.toLocaleDateString();
    };

    private handleClearErrors = () => {
        this.setState({
            errors: [],
        });
    };

    private handleCreateDownload = async () => {
        this.setState({
            saving: true,
        });

        if (this.state.userId) {
            if (this.state.planDownload) {
                const input: UpdateDownloadInput = {
                    id: this.state.planDownload.id,
                    downloadedAt: [
                        ...this.state.planDownload.downloadedAt,
                        new Date().toISOString(),
                    ],
                };

                API.graphql(
                    graphqlOperation(graphQLMutations.updateDownloadMutation, {
                        input: input,
                    })
                );
            } else {
                const input: CreateDownloadInput = {
                    id: uuid(),
                    planId: this.state.planId,
                    userId: this.state.userId,
                    downloadedAt: [new Date().toISOString()],
                };

                API.graphql(
                    graphqlOperation(graphQLMutations.createDownloadMutation, {
                        input: input,
                    })
                );
            }
        }

        await this.setState((prevState) => ({
            ...prevState,
            saving: false,
            plan: {
                ...prevState.plan,
                downloadedCount: prevState.plan.downloadedCount + 1,
            },
        }));

        ReactGA.event({
            category: 'download',
            action: 'User downloaded a plan',
        });
    };

    private handleDelete = async () => {
        this.setState({
            saving: true,
        });

        const input: DeletePlanInput = {
            id: this.state.planId,
        };

        const deleteResult = (await API.graphql(
            graphqlOperation(graphQLMutations.deletePlanMutation, {
                input: input,
            })
        )) as GraphQLResult<DeletePlanMutation>;

        if (deleteResult?.data) {
            await Storage.remove(this.state.plan.imageS3Info.key, {
                level: 'protected',
            });
            await Storage.remove(this.state.plan.pdfS3Key, {
                level: 'protected',
            });

            await this.handleDeleteDownloads();
            await this.handleDeleteFavorites();

            ReactGA.event({
                category: 'delete',
                action: 'User deleted a plan',
            });

            this.setState({
                deleteComplete: true,
            });
        } else {
            this.setState({
                saving: false,
                errors: [
                    'An unexpected error occurred when deleteing this plan. Please try again.',
                ],
            });
        }
    };

    private handleDeleteDownloads = async (nextToken: string = null) => {
        const planDownloads = (await API.graphql(
            graphqlOperation(graphQLQueries.getDownloadsByPlanQuery, {
                planId: this.state.planId,
                nextToken: nextToken,
            })
        )) as GraphQLResult<GetDownloadByPlanIdQuery>;

        if (planDownloads?.data) {
            const { getDownloadByPlanId } = planDownloads.data;

            if (getDownloadByPlanId?.items?.length) {
                getDownloadByPlanId.items.forEach((download) => {
                    API.graphql(
                        graphqlOperation(
                            graphQLMutations.deleteDownloadMutation,
                            {
                                input: {
                                    id: download.id,
                                },
                            }
                        )
                    );
                });

                if (getDownloadByPlanId.nextToken?.length) {
                    await this.handleDeleteDownloads(
                        getDownloadByPlanId.nextToken
                    );
                }
            }
        }
    };

    private handleDeleteFavorites = async (nextToken: string = null) => {
        const planFavorites = (await API.graphql(
            graphqlOperation(graphQLQueries.getFavoritesByPlanQuery, {
                planId: this.state.planId,
                nextToken: nextToken,
            })
        )) as GraphQLResult<GetFavoriteByPlanIdQuery>;

        if (planFavorites?.data) {
            const { getFavoriteByPlanId } = planFavorites.data;

            if (getFavoriteByPlanId?.items?.length) {
                getFavoriteByPlanId.items.forEach((favorite) => {
                    API.graphql(
                        graphqlOperation(
                            graphQLMutations.deleteFavoriteMutation,
                            {
                                input: {
                                    id: favorite.id,
                                },
                            }
                        )
                    );
                });

                if (getFavoriteByPlanId.nextToken?.length) {
                    await this.handleDeleteFavorites(
                        getFavoriteByPlanId.nextToken
                    );
                }
            }
        }
    };

    private handleDeleteDialogOpen = () => {
        this.setState({
            deleteDialogOpen: true,
        });
    };

    private handleDeleteDialogClose = () => {
        if (!this.state.saving) {
            this.setState({
                deleteDialogOpen: false,
            });
        }
    };

    private handleEditingOff = () => {
        this.setState((prevState) => ({
            ...prevState,
            editing: false,
            editedPlan: null,
        }));
    };

    private handleEditingOn = () => {
        this.setState({
            editing: true,
            planMenuAnchor: null,
        });
    };

    private handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        const el = event.currentTarget;

        this.setState({
            planMenuAnchor: el,
        });
    };

    private handleMenuClose = () => {
        this.setState({
            planMenuAnchor: null,
        });
    };

    private handleSave = async (editPlan: EditPlan) => {
        this.setState({
            saving: true,
        });

        const errors = this.validatePlan(editPlan);

        if (errors.length > 0) {
            this.setState({
                saving: false,
                errors: errors,
            });
            throw Error('Plan validation failed.');
        }

        const input: UpdatePlanInput = {
            id: this.state.planId,
            description: editPlan.newDescription,
            requiredMaterialIds: editPlan.newRequiredMaterialIds,
            requiredToolIds: editPlan.newRequiredToolIds,
        };

        const planResult = (await API.graphql(
            graphqlOperation(graphQLMutations.updatePlanMutation, {
                input: input,
            })
        )) as GraphQLResult<UpdatePlanMutation>;

        if (planResult?.data?.updatePlan) {
            const decoratedPlan = this.decoratePlan(planResult.data.updatePlan);

            this.setState({
                plan: decoratedPlan,
                editing: false,
                saving: false,
            });

            ReactGA.event({
                category: 'edit',
                action: 'User edited a plan description',
            });
        } else {
            this.setState({
                saving: false,
                errors: [
                    "An unexpected error occurred when updating this plan's description. Please try again.",
                ],
            });

            throw Error(
                "An unexpected error occurred when updating this plan's description. Please try again."
            );
        }
    };

    private handleTogglePlanFavorite = (toggleFavOn: boolean) => {
        ReactGA.event({
            category: 'favorite',
            action: toggleFavOn
                ? 'User Favorited Plan'
                : 'User Unfavorited Plan',
            label: 'favorite on plan view page',
        });

        if (toggleFavOn) {
            this.setState((prevState) => ({
                ...prevState,
                plan: {
                    ...prevState.plan,
                    isFavoritedByUser: true,
                    favoritedCount: prevState.plan.favoritedCount + 1,
                },
            }));
        } else {
            this.setState((prevState) => ({
                ...prevState,
                plan: {
                    ...prevState.plan,
                    isFavoritedByUser: false,
                    favoritedCount: prevState.plan.favoritedCount - 1,
                },
            }));
        }

        this.props.onPlanFavorite(this.state.planId, toggleFavOn);
    };

    private validatePlan = (editPlan: EditPlan): string[] => {
        const errors: string[] = [];

        if (!editPlan.newDescription.length) {
            errors.push('Please enter a plan description.');
        }

        if (!editPlan.newRequiredMaterialIds.length) {
            errors.push(
                'Please select one or more materials your plan requires.'
            );
        }

        if (!editPlan.newRequiredToolIds.length) {
            errors.push('Please select one or more tools your plan requires.');
        }

        return errors;
    };

    render = () => {
        const { classes } = this.props;

        if (this.state.loading) {
            return (
                <div className={classes.loading}>
                    <CircularProgress color='secondary' size='100px' />
                </div>
            );
        }
        if (this.state.deleteComplete) {
            return <Redirect to='/my-mtf' />;
        } else if (this.state.plan) {
            return (
                <div className={classes.viewPlanContainer}>
                    <div className={classes.title}>
                        <Typography variant='h2'>
                            {this.state.plan.name}
                        </Typography>
                        {!!this.state.userId?.length &&
                            this.state.userId ===
                                this.state.plan.createdBy.id &&
                            !this.state.editing && (
                                <div>
                                    <IconButton
                                        onClick={this.handleMenu}
                                        aria-controls='plan-actions-menu'
                                        aria-haspopup='true'>
                                        <MoreVertSharpIcon />
                                    </IconButton>
                                    <Menu
                                        id='plan-actions-menu'
                                        anchorEl={this.state.planMenuAnchor}
                                        keepMounted
                                        open={!!this.state.planMenuAnchor}
                                        onClose={this.handleMenuClose}>
                                        <MenuItem
                                            onClick={this.handleEditingOn}>
                                            <EditSharpIcon />
                                            &nbsp;Edit
                                        </MenuItem>
                                        <MenuItem
                                            onClick={
                                                this.handleDeleteDialogOpen
                                            }>
                                            <DeleteOutlineSharpIcon />
                                            &nbsp;Delete
                                        </MenuItem>
                                    </Menu>
                                </div>
                            )}
                    </div>
                    <div className={classes.subTitle}>
                        <Typography>
                            Created:&nbsp;
                            <PlanDate
                                date={new Date(this.state.plan.created)}
                            />
                            &nbsp;by&nbsp;{this.state.plan.createdBy.username}
                        </Typography>
                    </div>
                    <div className={classes.image}>
                        <AmplifyS3Image
                            level={AccessLevel.Protected}
                            imgKey={this.state.plan.imageS3Info.key}
                            identityId={this.state.plan.createdBy.id}
                        />
                    </div>
                    <div className={classes.planContent}>
                        <PlanDetails
                            description={this.state.plan.description}
                            allMaterials={this.state.materials}
                            requiredMaterials={
                                this.state.plan.requiredMaterials
                            }
                            allTools={this.state.tools}
                            requiredTools={this.state.plan.requiredTools}
                            editing={this.state.editing}
                            onSave={this.handleSave}
                            onCancel={this.handleEditingOff}
                        />
                        <div className={classes.buttonRow}>
                            <DownloadButton
                                downloadUrl={this.state.downloadUrl}
                                disabled={
                                    this.state.editing || this.state.saving
                                }
                                onDownload={this.handleCreateDownload}
                            />
                            <div className={classes.butonRowIcons}>
                                <PlanFavorite
                                    planId={this.state.planId}
                                    disabled={
                                        !this.props.userId ||
                                        this.props.userId.length === 0
                                    }
                                    isFavoritedByUser={
                                        this.state.plan.isFavoritedByUser
                                    }
                                    favoritedCount={
                                        this.state.plan.favoritedCount
                                    }
                                    onToggleFavorite={
                                        this.handleTogglePlanFavorite
                                    }
                                />
                                <PlanDownloadedCount
                                    downloadedCount={
                                        this.state.plan.downloadedCount
                                    }
                                />
                            </div>
                        </div>
                        {this.state.planDownload && (
                            <div className={classes.lastDownloadedRow}>
                                Last Downloaded On:&nbsp;
                                {this.getLastDownloadedDate()}
                            </div>
                        )}
                    </div>
                    <PlanDelete
                        planName={this.state.plan.name}
                        dialogOpen={this.state.deleteDialogOpen}
                        deleting={this.state.saving}
                        onDelete={this.handleDelete}
                        onCancel={this.handleDeleteDialogClose}
                    />
                    <ErrorMessage
                        errors={this.state.errors}
                        onClearErrors={this.handleClearErrors}
                    />
                </div>
            );
        } else {
            return <NotFound userId={this.state.userId} />;
        }
    };
}

export default withStyles(styles(mtfTheme))(PlanView);
