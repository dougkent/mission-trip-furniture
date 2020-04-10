// React
import React from 'react';
import { Redirect } from 'react-router-dom';

// AWS
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react';

// Material UI
import {
    Chip,
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
    EditDescription,
    ErrorMessage,
    PlanDate,
    PlanDelete,
    PlanFavorite,
} from '../../components';
import {
    CreateDownloadInput,
    DeletePlanInput,
    DeletePlanMutation,
    GqlQuery,
    GetPlanQuery,
    Plan,
    UpdatePlanInput,
    UpdatePlanMutation,
} from '../../models/api-models';
import * as graphQLQueries from '../../graphql/queries';
import { PlanFavoriteService } from '../../services';

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
            height: theme.spacing(25),
            marginBottom: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                width: '50%',
                height: theme.spacing(25),
            },
            [theme.breakpoints.up('lg')]: {
                height: '100%',
            },
            '& img': {
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
            padding: `0 ${theme.spacing(2)}px`,
            marginBottom: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                width: '50%',
            },
        },
        row: {
            width: '100%',
            flexGrow: 1,
            marginBottom: `${theme.spacing(2)}px`,
            display: 'flex',
        },
        rowTitle: {
            marginRight: theme.spacing(1),
        },
        descriptionTitle: {
            marginTop: theme.spacing(3),
        },
        buttonRow: {
            marginTop: theme.spacing(3),
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            [theme.breakpoints.up('md')]: {
                justifyContent: 'flex-start',
            },
        },
    });

export interface ViewPlanProps extends AppProps, WithStyles<typeof styles> {
    planId: string;
}
class PlanView extends React.Component<ViewPlanProps, ViewPlanState> {
    private planFavoriteService = new PlanFavoriteService();

    constructor(props: ViewPlanProps) {
        super(props);

        this.state = {
            userId: props.userId,
            materials: props.materials,
            tools: props.tools,
            userFavoritedPlanIds: props.userFavoritedPlanIds,
            planId: props.planId,
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
        const planResult: GqlQuery<GetPlanQuery> = await API.graphql({
            query: graphQLQueries.getPlanQuery,
            variables: { id: this.props.planId },
            // @ts-ignore
            authMode: 'AWS_IAM',
        });

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
            requiredMaterials: this.state.materials.filter(material => {
                return !!plan.requiredMaterialIds.find(
                    id => id === material.id
                );
            }),
            requiredTools: this.state.tools.filter(tool => {
                return !!plan.requiredToolIds.find(id => id === tool.id);
            }),
            isFavoritedByUser: this.state.userFavoritedPlanIds.some(
                planId => planId === plan.id
            ),
        };
    };

    private handleClearErrors = () => {
        this.setState({
            errors: [],
        });
    };

    private handleCreateDownload = () => {
        this.setState({
            saving: true,
        });

        if (this.state.userId) {
            const input: CreateDownloadInput = {
                id: uuid(),
                planId: this.state.planId,
                userId: this.state.userId,
            };

            API.graphql(
                graphqlOperation(graphQLQueries.createDownloadMutation, {
                    input: input,
                })
            );
        }

        this.setState(prevState => ({
            ...prevState,
            saving: false,
            plan: {
                ...prevState.plan,
                downloadsCount: prevState.plan.downloadedCount++,
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

        const deleteResult: GqlQuery<DeletePlanMutation> = await API.graphql(
            graphqlOperation(graphQLQueries.deletePlanMutation, {
                input: input,
            })
        );

        if (deleteResult?.data) {
            await Storage.remove(this.state.plan.imageS3Info.key, {
                level: 'protected',
            });
            await Storage.remove(this.state.plan.pdfS3Key, {
                level: 'protected',
            });

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
        this.setState(prevState => ({
            ...prevState,
            editing: false,
            editDescription: prevState.plan.description,
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

    private handleSave = async (newDescription: string) => {
        this.setState({
            saving: true,
        });

        if (!newDescription || !newDescription.length) {
            this.setState({
                saving: false,
                errors: ['Please enter a description.'],
            });
            throw Error('Please enter a description');
        }

        const input: UpdatePlanInput = {
            id: this.state.planId,
            description: newDescription,
        };

        const planResult: GqlQuery<UpdatePlanMutation> = await API.graphql(
            graphqlOperation(graphQLQueries.updatePlanMutation, {
                input: input,
            })
        );

        if (planResult?.data?.updatePlan) {
            this.setState({
                plan: planResult.data.updatePlan,
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
            this.setState(prevState => ({
                ...prevState,
                plan: {
                    ...prevState.plan,
                    isFavoritedByUser: true,
                    favoritedCount: prevState.plan.favoritedCount++,
                },
            }));
        } else {
            this.setState(prevState => ({
                ...prevState,
                plan: {
                    ...prevState.plan,
                    isFavoritedByUser: false,
                    favoritedCount: prevState.plan.favoritedCount--,
                },
            }));
        }

        this.props.onPlanFavorite(this.state.planId, toggleFavOn);
    };

    private renderDescription = () => {
        const { classes } = this.props;

        if (this.state.editing) {
            return (
                <EditDescription
                    description={this.state.plan.description}
                    saving={this.state.saving}
                    onCancel={this.handleEditingOff}
                    onSave={this.handleSave}
                />
            );
        } else {
            return (
                <>
                    <Typography
                        variant='h5'
                        className={classes.descriptionTitle}>
                        Description
                    </Typography>

                    <Typography variant='body1' className={classes.row}>
                        {this.state.plan.description}
                    </Typography>
                </>
            );
        }
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
                        <S3Image
                            level='protected'
                            imgKey={this.state.plan.imageS3Info.key}
                            identityId={this.state.plan.createdBy.id}
                        />
                    </div>
                    <div className={classes.planContent}>
                        <div className={classes.row}>
                            <Typography
                                variant='subtitle1'
                                className={classes.rowTitle}>
                                Materials:
                            </Typography>
                            {this.state.plan.requiredMaterials?.map(
                                material => (
                                    <Chip
                                        key={material.id}
                                        size='small'
                                        color='secondary'
                                        label={material.name}
                                    />
                                )
                            )}
                        </div>
                        <div className={classes.row}>
                            <Typography
                                variant='subtitle1'
                                className={classes.rowTitle}>
                                Tools:
                            </Typography>
                            {this.state.plan.requiredTools?.map(tool => (
                                <Chip
                                    key={tool.id}
                                    size='small'
                                    color='secondary'
                                    label={tool.name}
                                />
                            ))}
                        </div>
                        {this.renderDescription()}
                        <div className={classes.buttonRow}>
                            <DownloadButton
                                downloadUrl={this.state.downloadUrl}
                                disabled={
                                    this.state.editing || this.state.saving
                                }
                                onDownload={this.handleCreateDownload}
                            />
                            <PlanFavorite
                                planId={this.state.planId}
                                disabled={
                                    !this.props.userId ||
                                    this.props.userId.length === 0
                                }
                                isFavoritedByUser={
                                    this.state.plan.isFavoritedByUser
                                }
                                favoritedCount={this.state.plan.favoritedCount}
                                onToggleFavorite={this.handleTogglePlanFavorite}
                            />
                        </div>
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
