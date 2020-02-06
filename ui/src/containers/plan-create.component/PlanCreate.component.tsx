// React
import React from 'react';

// AWS
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';
import { Connect, withAuthenticator } from 'aws-amplify-react';
import aws_exports from '../../aws-exports';

// Material UI
import {
    Button,
    TextField,
    Paper,
    createStyles,
    Theme,
    withStyles,
    WithStyles,
    Typography,
} from '@material-ui/core';

// uuid
import { v4 as uuid } from 'uuid';

// MTF
import { signUpConfig } from '../../models/sign-up-config.model';
import MaterialsSelector from '../../components/materials-selector.component/MaterialsSelector.component';
import ToolsSelector from '../../components/tools-selector.component/ToolsSelector.component';
import PdfUploader from '../../components/pdf-uploader.component/PdfUploader.component';
import ImageUploader from '../../components/image-uploader.component/ImageUploader.component';
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
import { AppProps } from '../../models/props';
import { CreatePlanState } from '../../models/states';
import { mtfTheme } from '../../themes';

// Configure
Amplify.configure(aws_exports);

const styles = (theme: Theme) =>
    createStyles({
        formContainer: {
            padding: 20,
            marginTop: 40,
            [theme.breakpoints.up('md')]: {
                padding: 40,
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
            marginBottom: 10,
            marginTop: 10,
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
            planCreatedById: this.props.userId,
        },
        planMaterials: [],
        planTools: [],
        loading: false,
        userId: this.props.userId,
    };

    constructor(props: CreatePlanProps) {
        super(props);

        this.state = this.initialState;
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
        const planMaterials: CreatePlanMaterialInput[] = materials.map(
            material => {
                return {
                    id: uuid(),
                    planMaterialMaterialId: material.id,
                    planMaterialPlanId: this.state.plan.id,
                };
            }
        );

        this.setState(prevState => ({
            ...prevState,
            planMaterials: planMaterials,
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

        this.uploadPdf();
        this.uploadImage();

        const planResult: GqlQuery<CreatePlanMutation> = await API.graphql(
            graphqlOperation(this.createPlanMutation, {
                input: this.state.plan,
            })
        );

        this.state.planMaterials.forEach(material => {
            API.graphql(
                graphqlOperation(this.createPlanMaterialMutation, {
                    input: material,
                })
            );
        });

        this.state.planTools.forEach(tool => {
            API.graphql(
                graphqlOperation(this.createPlanToolMutation, {
                    input: tool,
                })
            );
        });

        if (planResult.data.createPlan.id) {
            this.setState(this.initialState);
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

        this.setState(prevState => {
            const materials = prevState.planMaterials.map(material => {
                material.planMaterialPlanId = planId;
                return material;
            });

            const tools = prevState.planTools.map(tool => {
                tool.planToolPlanId = planId;
                return tool;
            });

            return {
                ...prevState,
                planMaterials: materials,
                planTools: tools,
                plan: {
                    ...prevState.plan,
                    id: planId,
                    [key]: value,
                },
            };
        });
    };

    private handleToolSelected = (tools: Tool[]) => {
        const planTools: CreatePlanToolInput[] = tools.map(tool => {
            return {
                id: uuid(),
                planToolToolId: tool.id,
                planToolPlanId: this.state.plan.id,
            };
        });

        this.setState(prevState => ({
            ...prevState,
            planTools: planTools,
        }));
    };

    private uploadImage = () => {
        Storage.put(this.state.plan.imageS3Info.key, this.state.imageFile, {
            level: 'protected',
            metadata: { owner: this.state.plan.planCreatedById },
        });
    };

    private uploadPdf = () => {
        Storage.put(this.state.plan.pdfS3Key, this.state.pdfFile, {
            level: 'protected',
            contentType: 'application/pdf',
            metadata: { owner: this.state.plan.planCreatedById },
        });
    };

    render() {
        const { classes } = this.props;

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
                            inputProps={{ maxLength: 500 }}
                            multiline
                            name='description'
                            onChange={this.handleTextChange}
                            label='Description'
                            required
                            rows='4'
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
                        <Connect query={graphqlOperation(this.listToolsQuery)}>
                            {({
                                data: { listTools },
                                loading,
                            }: GqlQuery<ListToolsQuery>) => {
                                return (
                                    <ToolsSelector
                                        tools={
                                            !!listTools ? listTools.items : null
                                        }
                                        loading={loading}
                                        onSelect={this.handleToolSelected}
                                    />
                                );
                            }}
                        </Connect>
                    </div>
                    <div className={classes.formRow}>
                        <Connect
                            query={graphqlOperation(this.listMaterialsQuery)}>
                            {({
                                data: { listMaterials },
                                loading,
                            }: GqlQuery<ListMaterialsQuery>) => {
                                return (
                                    <MaterialsSelector
                                        materials={
                                            !!listMaterials
                                                ? listMaterials.items
                                                : null
                                        }
                                        loading={loading}
                                        onSelect={this.handleMaterialSelected}
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

export default withStyles(styles(mtfTheme))(
    withAuthenticator(CreatePlan, {
        signUpConfig: signUpConfig,
    })
);
