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
    DeletePlanMaterialInput,
    DeletePlanMutation,
    DeletePlanToolInput,
    GqlQuery,
    GetPlanQuery,
    UpdatePlanInput,
    UpdatePlanMutation,
    Plan,
} from '../../models/api-models';
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
    private getPlanQuery = `query GetPlan($id: ID!) {
        getPlan(id: $id) {
            id
            name
            description
            pdfS3Key
            imageS3Info {
                key   
            }
            created
            createdBy {
                id
                username
            }
            favoritedCount
            favoritedBy {
                items {
                    userId
                }
            }
            downloadedCount
            materialsRequired {
                items {
                    id
                    material {
                        name
                    }
                }
            }
            toolsRequired {
                items {
                    id
                    tool {
                        name
                    }
                }
            }
        }
    }`;

    private updatePlanMutation = `mutation UpdatePlan($input: UpdatePlanInput!) {
        updatePlan(input: $input) {
            id
            name
            description
            pdfS3Key
            imageS3Info {
                key   
            }
            created
            createdBy {
                id
                username
            }
            favoritedCount
            favoritedBy {
                items {
                    userId
                }
            }
            downloadedCount
            materialsRequired {
                items {
                    id
                    material {
                        name
                    }
                }
            }
            toolsRequired {
                items {
                    id
                    tool {
                        name
                    }
                }
            }
        }
    }`;

    private deletePlanMutation = `mutation DeletePlan($input: DeletePlanInput!) {
        deletePlan(input: $input) {
            id
        }
    }`;

    private deletePlanMaterialMutation = `mutation DeletePlanMaterial($input: DeletePlanMaterialInput!) {
        deletePlanMaterial(input: $input) {
            id
        }
    }`;

    private deletePlanToolMutation = `mutation DeletePlanTool($input: DeletePlanToolInput!) {
        deletePlanTool(input: $input) {
            id
        }
    }`;

    private createDownloadMutation = `mutation CreateDownload($input: CreateDownloadInput!) {
        createDownload(input: $input) {
            id
        }
    }`;

    private planFavoriteService = new PlanFavoriteService();

    constructor(props: ViewPlanProps) {
        super(props);

        this.state = {
            plan: null,
            planId: props.planId,
            userId: props.userId,
            downloadUrl: null,
            loading: true,
            planMenuAnchor: null,
            editing: false,
            saving: false,
            deleteDialogOpen: false,
            deleteComplete: false,
            error: null,
        };
    }

    async componentDidMount() {
        const planResult: GqlQuery<GetPlanQuery> = await API.graphql({
            query: this.getPlanQuery,
            variables: { id: this.props.planId },
            // @ts-ignore
            authMode: 'AWS_IAM',
        });

        if (planResult && planResult.data && planResult.data.getPlan) {
            const downloadUrl = await Storage.get(
                planResult.data.getPlan.pdfS3Key,
                {
                    level: 'protected',
                    identityId: planResult.data.getPlan.createdBy.id,
                }
            );

            this.setState(prevState => ({
                ...prevState,
                planId: this.props.planId,
                plan: planResult.data.getPlan,
                downloadUrl: downloadUrl as string,
                loading: false,
            }));
        } else {
            this.setState(prevState => ({
                ...prevState,
                loading: false,
            }));
        }
    }

    componentDidUpdate(prevProps: ViewPlanProps) {
        if (this.props.userId !== prevProps.userId) {
            this.setState(prevState => ({
                ...prevState,
                userId: this.props.userId,
            }));
        }
    }

    private handleClearError = () => {
        this.setState(prevState => ({
            ...prevState,
            error: null,
        }));
    };

    private handleCreateDownload = () => {
        this.setState(prevState => ({
            ...prevState,
            saving: true,
        }));

        if (this.state.userId) {
            const input: CreateDownloadInput = {
                id: uuid(),
                planId: this.state.planId,
                userId: this.state.userId,
            };

            API.graphql(
                graphqlOperation(this.createDownloadMutation, { input: input })
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
    };

    private handleDelete = async () => {
        this.setState(prevState => ({
            ...prevState,
            saving: true,
        }));

        const input: DeletePlanInput = {
            id: this.state.planId,
        };

        const deleteResult: GqlQuery<DeletePlanMutation> = await API.graphql(
            graphqlOperation(this.deletePlanMutation, { input: input })
        );

        if (deleteResult && deleteResult.data) {
            await Storage.remove(this.state.plan.imageS3Info.key, {
                level: 'protected',
            });
            await Storage.remove(this.state.plan.pdfS3Key, {
                level: 'protected',
            });

            this.state.plan.materialsRequired.items.forEach(
                async planMaterial => {
                    const materialInput: DeletePlanMaterialInput = {
                        id: planMaterial.id,
                    };

                    await API.graphql(
                        graphqlOperation(this.deletePlanMaterialMutation, {
                            input: materialInput,
                        })
                    );
                }
            );

            this.state.plan.toolsRequired.items.forEach(async planTool => {
                const toolInput: DeletePlanToolInput = {
                    id: planTool.id,
                };

                await API.graphql(
                    graphqlOperation(this.deletePlanToolMutation, {
                        input: toolInput,
                    })
                );
            });

            this.setState(prevState => ({
                ...prevState,
                deleteComplete: true,
            }));
        } else {
            this.setState(prevState => ({
                ...prevState,
                saving: false,
                error:
                    'An unexpected error occurred when deleteing this plan. Please try again.',
            }));
        }
    };

    private handleDeleteDialogOpen = () => {
        this.setState(prevState => ({
            ...prevState,
            deleteDialogOpen: true,
        }));
    };

    private handleDeleteDialogClose = () => {
        if (!this.state.saving) {
            this.setState(prevState => ({
                ...prevState,
                deleteDialogOpen: false,
            }));
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
        this.setState(prevState => ({
            ...prevState,
            editing: true,
            planMenuAnchor: null,
        }));
    };

    private handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        const el = event.currentTarget;

        this.setState(prevState => ({
            ...prevState,
            planMenuAnchor: el,
        }));
    };

    private handleMenuClose = () => {
        this.setState(prevState => ({
            ...prevState,
            planMenuAnchor: null,
        }));
    };

    private handleSave = async (newDescription: string) => {
        this.setState(prevState => ({
            ...prevState,
            saving: true,
        }));

        if (!newDescription || !newDescription.length) {
            this.setState(prevState => ({
                ...prevState,
                saving: false,
                error: 'Please enter a description.',
            }));
            throw Error('Please enter a description');
        }

        const input: UpdatePlanInput = {
            id: this.state.planId,
            description: newDescription,
        };

        const planResult: GqlQuery<UpdatePlanMutation> = await API.graphql(
            graphqlOperation(this.updatePlanMutation, { input: input })
        );

        if (planResult && planResult.data && planResult.data.updatePlan) {
            this.setState(prevState => ({
                ...prevState,
                plan: planResult.data.updatePlan,
                editing: false,
                saving: false,
            }));
        } else {
            this.setState(prevState => ({
                ...prevState,
                saving: false,
                error:
                    "An unexpected error occurred when updating this plan's description. Please try again.",
            }));
            throw Error(
                "An unexpected error occurred when updating this plan's description. Please try again."
            );
        }
    };

    private handleTogglePlanFavorite = (toggleFavOn: boolean) => {
        if (toggleFavOn) {
            this.planFavoriteService.createFavorite(
                this.state.planId,
                this.state.userId
            );
        } else {
            this.planFavoriteService.deleteFavorite(
                this.state.planId,
                this.state.userId
            );
        }
    };

    private isFavoritedByUser = (plan: Plan): boolean => {
        return this.planFavoriteService.isFavoritedByUser(
            this.state.userId,
            plan
        );
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

    render() {
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
                        {this.state.userId &&
                            this.state.userId.length > 0 &&
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
                            {this.state.plan.materialsRequired?.items?.map(
                                planMaterial => (
                                    <Chip
                                        key={planMaterial.id}
                                        size='small'
                                        color='secondary'
                                        label={planMaterial.material.name}
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
                            {this.state.plan.toolsRequired?.items?.map(
                                planTool => (
                                    <Chip
                                        key={planTool.id}
                                        size='small'
                                        color='secondary'
                                        label={planTool.tool.name}
                                    />
                                )
                            )}
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
                                isFavoritedByUser={this.isFavoritedByUser(
                                    this.state.plan
                                )}
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
                        error={this.state.error}
                        onClearError={this.handleClearError}
                    />
                </div>
            );
        } else {
            return <NotFound userId={this.state.userId} />;
        }
    }
}

export default withStyles(styles(mtfTheme))(PlanView);
