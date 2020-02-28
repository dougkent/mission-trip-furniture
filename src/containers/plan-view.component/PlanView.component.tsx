// React
import React from 'react';
import { Redirect } from 'react-router-dom';

// AWS
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';
import aws_exports from '../../aws-exports';
import { S3Image } from 'aws-amplify-react';

// Material UI
import {
    Button,
    Chip,
    CircularProgress,
    createStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Theme,
    Typography,
    withStyles,
    WithStyles,
} from '@material-ui/core';
import MoreVertSharpIcon from '@material-ui/icons/MoreVertSharp';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import DeleteOutlineSharpIcon from '@material-ui/icons/DeleteOutlineSharp';

// MTF
import { AppProps } from '../../models/props';
import { ViewPlanState } from '../../models/states';
import {
    DeletePlanInput,
    DeletePlanMaterialInput,
    DeletePlanMutation,
    DeletePlanToolInput,
    GqlQuery,
    GetPlanQuery,
    UpdatePlanInput,
    UpdatePlanMutation,
} from '../../models/api-models';
import { mtfTheme } from '../../themes';
import ErrorMessage from '../../components/error-message.component/ErrorMessage';
import NotFound from '../not-found.component/NotFound.component';

// Configure
Amplify.configure(aws_exports);

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
            marginBottom: theme.spacing(2),
            display: 'flex',
            justifyContent: 'space-between',
        },
        image: {
            width: '100%',
            height: theme.spacing(25),
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
        },
        editButtonRow: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        editTextField: {
            marginBottom: theme.spacing(1),
        },
        editButton: {
            marginRight: theme.spacing(1),
        },
        deleteDialog: {
            backgroundColor: theme.palette.error.dark,
            color: '#fff',
            '&:hover': {
                backgroundColor: theme.palette.error.dark,
                color: '#fff',
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
            editDescription: null,
            saving: false,
            deleteDialogOpen: false,
            deleteComplete: false,
            error: null,
        };
    }

    async componentDidMount() {
        const planResult: GqlQuery<GetPlanQuery> = await API.graphql(
            graphqlOperation(this.getPlanQuery, {
                id: this.props.planId,
            })
        );

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
                editDescription: planResult.data.getPlan.description,
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

    private handleSave = async () => {
        if (!this.state.editDescription.length) {
            this.setState(prevState => ({
                ...prevState,
                saving: false,
                error: 'Please enter a description.',
            }));
            return;
        }

        this.setState(prevState => ({
            ...prevState,
            saving: true,
        }));

        const input: UpdatePlanInput = {
            id: this.state.planId,
            description: this.state.editDescription,
        };

        const planResult: GqlQuery<UpdatePlanMutation> = await API.graphql(
            graphqlOperation(this.updatePlanMutation, { input: input })
        );

        if (planResult && planResult.data && planResult.data.updatePlan) {
            this.setState(prevState => ({
                ...prevState,
                plan: planResult.data.updatePlan,
                editing: false,
                editDescription: planResult.data.updatePlan.description,
                saving: false,
            }));
        } else {
            this.setState(prevState => ({
                ...prevState,
                saving: false,
                error:
                    "An unexpected error occurred when updating this plan's description. Please try again.",
            }));
        }
    };

    private handleTextChange = (event: React.ChangeEvent) => {
        const element = event.target as HTMLInputElement;
        const description: string = element.value;

        this.setState(prevState => ({
            ...prevState,
            editDescription: description,
        }));
    };

    private renderDescription = () => {
        const { classes } = this.props;

        if (this.state.editing) {
            return (
                <>
                    <TextField
                        inputProps={{ maxLength: 500 }}
                        multiline
                        name='description'
                        onChange={this.handleTextChange}
                        label='Description'
                        required
                        rows='8'
                        fullWidth
                        value={this.state.editDescription}
                        className={classes.editTextField}
                    />
                    <div className={classes.editButtonRow}>
                        {this.state.saving && (
                            <CircularProgress
                                size='24px'
                                className={classes.editButton}
                            />
                        )}
                        <Button
                            color='secondary'
                            variant='contained'
                            onClick={this.handleSave}
                            className={classes.editButton}
                            disabled={this.state.saving}>
                            Save
                        </Button>
                        <Button
                            color='primary'
                            variant='contained'
                            onClick={this.handleEditingOff}
                            className={classes.editButton}
                            disabled={this.state.saving}>
                            Cancel
                        </Button>
                    </div>
                </>
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

    private renderDeleteDialog = () => {
        const { classes } = this.props;

        return (
            <Dialog
                onClose={this.handleDeleteDialogClose}
                open={this.state.deleteDialogOpen}>
                <DialogTitle className={classes.deleteDialog}>
                    Delete {this.state.plan.name}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this plan? It will
                        remove it from the website and no one will be able to
                        access it anymore.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {this.state.saving && <CircularProgress size='24px' />}
                    <Button
                        className={classes.deleteDialog}
                        onClick={this.handleDelete}
                        disabled={this.state.saving}>
                        <DeleteOutlineSharpIcon />
                        &nbsp;Delete
                    </Button>
                    <Button
                        onClick={this.handleDeleteDialogClose}
                        disabled={this.state.saving}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
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
                        {this.state.userId === this.state.plan.createdBy.id &&
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
                                        size='small'
                                        color='secondary'
                                        label={planTool.tool.name}
                                    />
                                )
                            )}
                        </div>
                        {this.renderDescription()}
                        <div className={classes.buttonRow}>
                            <Button
                                color='secondary'
                                variant='contained'
                                href={this.state.downloadUrl}
                                target='_blank'
                                disabled={this.state.editing}>
                                Download PDF
                            </Button>
                        </div>
                    </div>
                    {this.renderDeleteDialog()}
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
