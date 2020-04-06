// React
import React from 'react';
import { Redirect } from 'react-router-dom';

// AWS
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

// Material UI
import {
    Button,
    CircularProgress,
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
    ErrorMessage,
    ImageUploader,
    MaterialsSelector,
    PdfUploader,
    ToolsSelector,
} from '../../components';
import { signUpConfig } from '../../models/sign-up-config.model';
import {
    GqlQuery,
    CreatePlanMutation,
    Material,
    Tool,
    GetPlanQuery,
} from '../../models/api-models';
import * as graphQLQueries from '../../graphql/queries';

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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        loadingIcon: {
            marginRight: theme.spacing(1),
        },
    });

export interface CreatePlanProps extends AppProps, WithStyles<typeof styles> {}

class CreatePlan extends React.Component<CreatePlanProps, CreatePlanState> {
    private initialState: CreatePlanState = {
        userId: this.props.userId,
        materials: this.props.materials,
        tools: this.props.tools,
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
            requiredMaterialIds: [],
            requiredToolIds: [],
            planCreatedById: this.props.userId,
        },
        selectedMaterials: [],
        selectedTools: [],
        loading: false,
        createComplete: false,
        errors: [],
    };

    constructor(props: CreatePlanProps) {
        super(props);

        this.state = this.initialState;
    }

    componentDidMount() {
        ReactGA.ga('send', 'pageview', window.location.pathname);
    }
    async componentDidUpdate(prevProps: CreatePlanProps) {
        if (
            this.props.userId !== prevProps.userId ||
            this.props.materials !== prevProps.materials ||
            this.props.tools !== prevProps.tools
        ) {
            this.setState(prevState => ({
                ...prevState,
                userId: this.props.userId,
                materials: this.props.materials,
                tools: this.props.tools,
                plan: {
                    ...prevState.plan,
                    planCreatedById: this.props.userId,
                },
            }));
        }
    }

    private handleClearErrors = () => {
        this.setState(prevState => ({
            ...prevState,
            errors: [],
        }));
    };

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
                requiredMaterialIds: prevState.selectedMaterials.map(
                    material => material.id
                ),
                requiredToolIds: prevState.selectedTools.map(tool => tool.id),
            },
        }));

        const errors = await this.validateForm();

        if (errors.length > 0) {
            this.setState(prevState => ({
                ...prevState,
                loading: false,
                errors: errors,
            }));
            return;
        }

        const planResult: GqlQuery<CreatePlanMutation> = await API.graphql(
            graphqlOperation(graphQLQueries.createPlanMutation, {
                input: this.state.plan,
            })
        );

        if (planResult.data.createPlan.id) {
            await this.uploadPdf();
            await this.uploadImage();

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
        } else {
            this.setState(prevState => ({
                ...prevState,
                loading: false,
                errors: [
                    'An unexpected error occurred when creating this plan. Please try again.',
                ],
            }));
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

    private isPlanIdAlphaNumeric = (): boolean => {
        const alphaNumericRegex = /^[\w\- ]+$/;

        return alphaNumericRegex.test(this.state.plan.id);
    };

    private isPlanIdAlpha = (): boolean => {
        const alphaRegex = /^(?=.*[a-zA-Z])/;

        return alphaRegex.test(this.state.plan.id);
    };

    private validateForm = async (): Promise<string[]> => {
        const errors: string[] = [];

        this.isPlanIdAlphaNumeric();

        if (!this.state.plan.name.length) {
            errors.push('Please enter a plan name.');
        } else if (!this.isPlanIdAlphaNumeric()) {
            errors.push(
                'Plan names can only be alpha-numeric. Please change your plan name to only contain the characters: A-Z, a-z, 0-9, spaces, or hyphens.'
            );
        } else if (!this.isPlanIdAlpha()) {
            errors.push(
                'Plan names need at least one alphabet letter in them (A-Z or a-z).'
            );
        } else if (await this.planAlreadyExists()) {
            errors.push(
                'A plan with that same name already exists. Please enter a different name.'
            );
        }

        if (!this.state.plan.description.length) {
            errors.push('Please enter a plan description.');
        }

        if (
            !this.state.pdfFile ||
            !this.state.pdfFile.name.endsWith('.pdf') ||
            this.state.pdfFile.type !== 'application/pdf'
        ) {
            errors.push('Please select a PDF to upload.');
        }

        if (
            !this.state.imageFile ||
            !this.state.imageFile.type.startsWith('image/')
        ) {
            errors.push('Please select an image to upload.');
        }

        if (!this.state.selectedMaterials.length) {
            errors.push(
                'Please select one or more materials your plan requires.'
            );
        }

        if (!this.state.selectedTools.length) {
            errors.push('Please select one or more tools your plan requires.');
        }

        return errors;
    };

    private planAlreadyExists = async (): Promise<boolean> => {
        const planResult: GqlQuery<GetPlanQuery> = await API.graphql(
            graphqlOperation(graphQLQueries.getPlanIdQuery, {
                id: this.state.plan.id,
            })
        );

        const { data } = planResult;

        return !!data?.getPlan?.id;
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
                                label='Name *'
                                className={classes.textField}
                            />
                        </div>
                        <div className={classes.formRow}>
                            <TextField
                                inputProps={{ maxLength: 2000 }}
                                multiline
                                name='description'
                                onChange={this.handleTextChange}
                                label='Description *'
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
                            <ToolsSelector
                                label='Select Tools Required for this Plan'
                                tools={this.state.tools}
                                loading={false}
                                onSelect={this.handleToolSelected}
                                selectedTools={this.state.selectedTools}
                            />
                        </div>
                        <div className={classes.formRow}>
                            <MaterialsSelector
                                label='Select Materials Required for this Plan'
                                materials={this.state.materials}
                                loading={false}
                                onSelect={this.handleMaterialSelected}
                                selectedMaterials={this.state.selectedMaterials}
                            />
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
                            {this.state.loading && (
                                <CircularProgress
                                    size='24px'
                                    className={classes.loadingIcon}
                                />
                            )}
                            <Button
                                color='secondary'
                                type='submit'
                                variant='contained'
                                disabled={this.state.loading}>
                                Create Plan
                            </Button>
                        </div>
                    </form>
                    <ErrorMessage
                        errors={this.state.errors}
                        onClearErrors={this.handleClearErrors}
                    />
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
