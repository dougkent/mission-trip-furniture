// React
import React from 'react';
import { Redirect } from 'react-router-dom';

// AWS
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { Connect, withAuthenticator } from 'aws-amplify-react';

// Material UI
import {
    Button,
    createStyles,
    Paper,
    TextField,
    Theme,
    Typography,
    withStyles,
    WithStyles,
} from '@material-ui/core';

// uuid
import { v4 as uuid } from 'uuid';

// Google Analytics
import ReactGA from 'react-ga';

// MTF
import { AppProps } from '../../models/props';
import { CreatePlanState } from '../../models/states';
import { mtfTheme } from '../../themes';
import {
    ImageUploader,
    MaterialsSelector,
    PdfUploader,
    ToolsSelector,
} from '../../components';
import { signUpConfig } from '../../models/sign-up-config.model';
import {
    GqlQuery,
    ListToolsQuery,
    ListMaterialsQuery,
    CreatePlanToolInput,
    CreatePlanMaterialInput,
    CreatePlanMutation,
    Material,
    Tool,
} from '../../models/api-models';

const styles = (theme: Theme) =>
    createStyles({
        formContainer: {
            padding: theme.spacing(2),
            marginTop: theme.spacing(4),
            [theme.breakpoints.up('md')]: {
                padding: theme.spacing(5),
                width: '70%',
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
        form: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        formRow: {
            width: '100%',
            flexGrow: 1,
            marginBottom: theme.spacing(1),
            marginTop: theme.spacing(1),
        },
        textField: {
            width: '100%',
        },
        multiCardRow: {
            display: 'flex',
        },
        submitButtonRow: {
            textAlign: 'right',
        },
    });

export interface CreatePlanProps extends AppProps, WithStyles<typeof styles> {}

class CreatePlan extends React.Component<CreatePlanProps, CreatePlanState> {
    private listMaterialsQuery = `query ListMaterials {
            listMaterials {
                items {
                    id
                    name
                }
            }
        }`;

    private listToolsQuery = `query ListTools {
            listTools {
                items {
                    id
                    name
                }
            }
        }`;

    private createPlanMutation = `mutation CreatePlan($input: CreatePlanInput!) {
        createPlan(input: $input) {
            id
        }
    }`;

    private createPlanMaterialMutation = `mutation CreatePlanMaterial($input: CreatePlanMaterialInput!) {
        createPlanMaterial(input: $input) {
            id
        }
    }`;

    private createPlanToolMutation = `mutation CreatePlanTool($input: CreatePlanToolInput!) {
        createPlanTool(input: $input) {
            id
        }
    }`;

    private initialState: CreatePlanState = {
        imageFile: null,
        pdfFile: null,
        plan: {
            id: '',
            name: '',
            description: '',
            pdfS3Key: '',
            imageS3Info: null,
            created: '',
            favoritedCount: 0,
            downloadedCount: 0,
            planCreatedById: this.props.userId,
        },
        selectedMaterials: [],
        selectedTools: [],
        loading: false,
        createComplete: false,
        userId: this.props.userId,
    };

    constructor(props: CreatePlanProps) {
        super(props);

        this.state = this.initialState;
    }

    componentDidMount() {
        ReactGA.ga('send', 'pageview', window.location.pathname);
    }
    async componentDidUpdate(prevProps: CreatePlanProps) {
        if (this.props.userId !== prevProps.userId) {
            this.setState(prevState => ({
                ...prevState,
                userId: this.props.userId,
                plan: {
                    ...prevState.plan,
                    planCreatedById: this.props.userId,
                },
            }));
        }
    }

    private getPlanId = (planName: string) => {
        return planName.toLowerCase().replace(/\s/g, '-');
    };

    private handleImageDeselect = () => {
        this.setState(prevState => ({
            ...prevState,
            imageFile: null,
            plan: {
                ...prevState.plan,
                imageS3Info: null,
            },
        }));
    };

    private handleImageSelect = (file: File) => {
        const fileName = `images/${uuid()}`;

        this.setState(prevState => ({
            ...prevState,
            imageFile: file,
            plan: {
                ...prevState.plan,
                imageS3Info: {
                    key: fileName,
                    width: 200,
                    height: 200,
                },
            },
        }));
    };

    private handleMaterialSelected = (materials: Material[]) => {
        this.setState(prevState => ({
            ...prevState,
            selectedMaterials: materials,
        }));
    };

    private handlePdfDeselect = async () => {
        this.setState(prevState => ({
            ...prevState,
            pdfFile: null,
            plan: {
                ...prevState.plan,
                pdfS3Key: '',
            },
        }));
    };

    private handlePdfSelect = async (file: File) => {
        const fileName = `pdfs/${uuid()}`;

        this.setState(prevState => ({
            ...prevState,
            pdfFile: file,
            plan: {
                ...prevState.plan,
                pdfS3Key: fileName,
            },
        }));
    };

    private handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        await this.setState(prevState => ({
            ...prevState,
            loading: true,
            plan: {
                ...prevState.plan,
                created: new Date().toISOString(),
            },
        }));

        const planResult: GqlQuery<CreatePlanMutation> = await API.graphql(
            graphqlOperation(this.createPlanMutation, {
                input: this.state.plan,
            })
        );

        if (planResult.data.createPlan.id) {
            await this.uploadPdf();
            await this.uploadImage();

            this.state.selectedMaterials.forEach(async material => {
                const planMaterialInput: CreatePlanMaterialInput = {
                    id: uuid(),
                    planMaterialMaterialId: material.id,
                    planMaterialPlanId: this.state.plan.id,
                };

                await API.graphql(
                    graphqlOperation(this.createPlanMaterialMutation, {
                        input: planMaterialInput,
                    })
                );
            });

            this.state.selectedTools.forEach(async tool => {
                const planToolInput: CreatePlanToolInput = {
                    id: uuid(),
                    planToolToolId: tool.id,
                    planToolPlanId: this.state.plan.id,
                };

                await API.graphql(
                    graphqlOperation(this.createPlanToolMutation, {
                        input: planToolInput,
                    })
                );
            });

            ReactGA.event({
                category: 'create',
                action: 'User Created a Plan',
            });

            setTimeout(
                () =>
                    this.setState(prevState => ({
                        ...prevState,
                        createComplete: true,
                    })),
                1000
            );
        }
    };

    private handleTextChange = (event: React.ChangeEvent) => {
        const element = event.target as HTMLInputElement;
        const key: string = element.name;
        const value: string = element.value;

        let planId = this.state.plan.id;

        if (key === 'name') {
            planId = this.getPlanId(value);
        }

        this.setState(prevState => ({
            ...prevState,
            plan: {
                ...prevState.plan,
                id: planId,
                [key]: value,
            },
        }));
    };

    private handleToolSelected = (tools: Tool[]) => {
        this.setState(prevState => ({
            ...prevState,
            selectedTools: tools,
        }));
    };

    private uploadImage = async () => {
        Storage.put(this.state.plan.imageS3Info.key, this.state.imageFile, {
            level: 'protected',
            metadata: { owner: this.state.plan.planCreatedById },
        });
    };

    private uploadPdf = async () => {
        Storage.put(this.state.plan.pdfS3Key, this.state.pdfFile, {
            level: 'protected',
            contentType: 'application/pdf',
            metadata: { owner: this.state.plan.planCreatedById },
        });
    };

    render() {
        const { classes } = this.props;

        if (this.state.createComplete) {
            return <Redirect to='/my-mtf' />;
        } else {
            return (
                <Paper className={classes.formContainer}>
                    <Typography variant='h2' noWrap>
                        Create Plan
                    </Typography>
                    <form onSubmit={this.handleSubmit} className={classes.form}>
                        <div className={classes.formRow}>
                            <TextField
                                inputProps={{ maxLength: 50 }}
                                name='name'
                                onChange={this.handleTextChange}
                                label='Name'
                                required
                                className={classes.textField}
                            />
                        </div>
                        <div className={classes.formRow}>
                            <TextField
                                inputProps={{ maxLength: 2000 }}
                                multiline
                                name='description'
                                onChange={this.handleTextChange}
                                label='Description'
                                required
                                rows='16'
                                className={classes.textField}
                            />
                        </div>
                        <div
                            className={`${classes.formRow} ${classes.multiCardRow}`}>
                            <PdfUploader
                                onDeselect={this.handlePdfDeselect}
                                onSelect={this.handlePdfSelect}
                                pdfFile={this.state.pdfFile}
                            />
                        </div>
                        <div className={classes.formRow}>
                            <Connect
                                query={graphqlOperation(this.listToolsQuery)}>
                                {({
                                    data: { listTools },
                                    loading,
                                }: GqlQuery<ListToolsQuery>) => {
                                    return (
                                        <ToolsSelector
                                            label='Select Tools Required for this Plan'
                                            tools={
                                                !!listTools
                                                    ? listTools.items
                                                    : null
                                            }
                                            loading={loading}
                                            onSelect={this.handleToolSelected}
                                            selectedTools={
                                                this.state.selectedTools
                                            }
                                        />
                                    );
                                }}
                            </Connect>
                        </div>
                        <div className={classes.formRow}>
                            <Connect
                                query={graphqlOperation(
                                    this.listMaterialsQuery
                                )}>
                                {({
                                    data: { listMaterials },
                                    loading,
                                }: GqlQuery<ListMaterialsQuery>) => {
                                    return (
                                        <MaterialsSelector
                                            label='Select Materials Required for this Plan'
                                            materials={
                                                !!listMaterials
                                                    ? listMaterials.items
                                                    : null
                                            }
                                            loading={loading}
                                            onSelect={
                                                this.handleMaterialSelected
                                            }
                                            selectedMaterials={
                                                this.state.selectedMaterials
                                            }
                                        />
                                    );
                                }}
                            </Connect>
                        </div>
                        <div
                            className={`${classes.formRow} ${classes.multiCardRow}`}>
                            <ImageUploader
                                image={this.state.imageFile}
                                onDeselect={this.handleImageDeselect}
                                onSelect={this.handleImageSelect}
                            />
                        </div>
                        <div
                            className={`${classes.formRow} ${classes.submitButtonRow}`}>
                            <Button
                                color='secondary'
                                type='submit'
                                variant='contained'
                                disabled={this.state.loading}>
                                Create Plan
                            </Button>
                        </div>
                    </form>
                </Paper>
            );
        }
    }
}

export default withStyles(styles(mtfTheme))(
    withAuthenticator(CreatePlan, {
        signUpConfig: signUpConfig,
    })
);
