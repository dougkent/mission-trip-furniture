// React
import React from 'react';

// AWS
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import { Connect, withAuthenticator } from 'aws-amplify-react';
import aws_exports from '../../aws-exports';

// Material
import { Button, TextField } from '@material-ui/core';

// uuid
import { v4 as uuid } from 'uuid';

// MTF
import './PlanCreate.component.scss';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { signUpConfig } from '../../models/sign-up-config.model';
import MaterialsSelector from '../../components/materials-selector.component/MaterialsSelector.component';
import ToolsSelector from '../../components/tools-selector.component/ToolsSelector.component';
import {
    CreatePlanInput,
    Material,
    Tool,
    ListMaterialsQuery,
    ListToolsQuery,
} from '../../models';

// Configure
Amplify.configure(aws_exports);

class CreatePlan extends React.Component<{}, CreatePlanInput> {
    constructor(props: any) {
        super(props);

        this.state = {
            id: uuid(),
            createdDate: '',
            createdByUsername: '',
            description: '',
            favoritedByUsernames: [],
            imageS3Info: null,
            name: '',
            pdfS3Key: '',
            requiredMaterialIds: [],
            requiredToolIds: [],
        };
    }

    async componentDidMount() {
        var user = await Auth.currentAuthenticatedUser();

        this.setState({ createdByUsername: user.username });
    }

    handleMaterialSelected = (materials: Material[]) => {
        const materialIds = materials.map(material => material.id);

        this.setState({
            requiredMaterialIds: materialIds,
        });
    };

    handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const createdDate = new Date().toISOString();

        await this.setState({
            createdDate: createdDate,
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

        this.setState({
            requiredToolIds: toolIds,
        });
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
                        <Connect query={graphqlOperation(queries.listTools)}>
                            {({
                                data: { listTools },
                                loading,
                            }: ListToolsQuery) => {
                                return (
                                    <ToolsSelector
                                        tools={!!listTools ? listTools : null}
                                        loading={loading}
                                        onSelect={this.handleToolSelected}
                                    />
                                );
                            }}
                        </Connect>
                    </div>
                    <div className='formRow'>
                        <Connect
                            query={graphqlOperation(queries.listMaterials)}>
                            {({
                                data: { listMaterials },
                                loading,
                            }: ListMaterialsQuery) => {
                                return (
                                    <MaterialsSelector
                                        materials={
                                            !!listMaterials
                                                ? listMaterials
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
