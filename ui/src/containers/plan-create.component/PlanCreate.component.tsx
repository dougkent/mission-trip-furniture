// React
import React from 'react';

// AWS
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { Connect, withAuthenticator } from 'aws-amplify-react';
import aws_exports from '../../aws-exports';

// Material
import { Button, TextField } from '@material-ui/core';

// uuid
import { v4 as uuid } from 'uuid';

// MTF
import './PlanCreate.component.scss';
import { signUpConfig } from '../../models/sign-up-config.model';
import MaterialsSelector from '../../components/materials-selector.component/MaterialsSelector.component';
import ToolsSelector from '../../components/tools-selector.component/ToolsSelector.component';
import {
    CreatePlanInput,
    ListToolsQuery,
    ListMaterialsQuery,
} from '../../models/api.models';
import { Material, Tool } from '../../models';
import { AppProps } from '../../models/props';

// Configure
Amplify.configure(aws_exports);

class CreatePlan extends React.Component<AppProps, CreatePlanInput> {
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

    constructor(props: AppProps) {
        super(props);

        this.state = {
            id: uuid(),
            name: '',
            description: '',
            pdfS3Key: '',
            imageS3Info: null,
            created: '',
            favoritedCount: 0,
            planCreatedById: props.userId,
        };
    }

    componentDidUpdate(prevProps: AppProps) {
        if (this.props.userId !== prevProps.userId) {
            this.setState({ planCreatedById: this.props.userId });
        }
    }

    handleMaterialSelected = (materials: Material[]) => {
        const materialIds = materials.map(material => material.id);

        // this.setState({
        //     requiredMaterialIds: materialIds,
        // });
    };

    handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const createdDate = new Date().toISOString();

        await this.setState({
            created: createdDate,
        });

        console.log(this.state);

        // const result = await API.graphql(
        //     graphqlOperation(mutations.createPlan, this.state)
        // );
        // console.log(result);
    };

    handleTextChange = (event: React.ChangeEvent) => {
        const element = event.target as HTMLInputElement;
        const key: string = element.name;
        const value: string = element.value;

        this.setState((prevState: CreatePlanInput) => ({
            ...prevState,
            [key]: value,
        }));
    };

    handleToolSelected = (tools: Tool[]) => {
        const toolIds = tools.map(tool => tool.id);

        // this.setState({
        //     requiredToolIds: toolIds,
        // });
    };

    render() {
        return (
            <div className='create-plan-container'>
                <h1>Create Plan</h1>
                <form className='create-plan-form' onSubmit={this.handleSubmit}>
                    <div className='formRow'>
                        <TextField
                            fullWidth
                            inputProps={{ maxLength: 50 }}
                            name='name'
                            onChange={this.handleTextChange}
                            placeholder='Name'
                            required
                        />
                    </div>
                    <div className='formRow'>
                        <TextField
                            fullWidth
                            inputProps={{ maxLength: 500 }}
                            multiline
                            name='description'
                            onChange={this.handleTextChange}
                            placeholder='Description'
                            required
                            rows='4'
                        />
                    </div>
                    <div className='formRow'>Pdf Upload Goes here.</div>
                    <div className='formRow'>
                        <Connect query={graphqlOperation(this.listToolsQuery)}>
                            {({
                                data: { listTools },
                                loading,
                            }: {
                                data: ListToolsQuery;
                                loading: boolean;
                            }) => {
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
                    <div className='formRow'>
                        <Connect
                            query={graphqlOperation(this.listMaterialsQuery)}>
                            {({
                                data: { listMaterials },
                                loading,
                            }: {
                                data: ListMaterialsQuery;
                                loading: boolean;
                            }) => {
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
                    <div className='formRow'>Image Upload Goes here.</div>
                    <div className='formRow'>
                        <Button
                            color='primary'
                            type='submit'
                            variant='contained'>
                            Create Plan
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withAuthenticator(CreatePlan, {
    signUpConfig: signUpConfig,
});
