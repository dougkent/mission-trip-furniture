// React
import React from 'react';

// AWS
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { Connect, withAuthenticator } from 'aws-amplify-react';
import aws_exports from '../../aws-exports';

// Material
import Input from '@material-ui/core/Input';
import { Button, TextField } from '@material-ui/core';

// MTF
import './PlanCreate.component.scss';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import * as graphQLModels from '../../services/API';
import { signUpConfig } from '../../models/sign-up-config.model';
import MaterialsSelector from '../../components/materials-selector.component/MaterialsSelector.component';
import ToolsSelector from '../../components/tools-selector.component/ToolsSelector.component';
import { Plan, Material, Tool } from '../../models';

// Configure
Amplify.configure(aws_exports);

class CreatePlan extends React.Component<{}, Plan> {
    constructor(props: any) {
        super(props);

        this.state = {
            id: '',
            name: '',
            description: '',
            materials: [],
            tools: [],
            created: new Date(),
            createdBy: '',
        };
    }

    handleMaterialSelected = (materials: Material[]) => {
        this.setState({
            materials: materials,
        });
    };

    handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const result = await API.graphql(
            graphqlOperation(mutations.createPlan, this.state)
        );
        console.log(result);
    };

    handleToolSelected = (tools: Tool[]) => {
        this.setState({
            tools: tools,
        });
    };

    render() {
        return (
            <div className='create-plan-container'>
                <h1>Create Plan</h1>
                <form className='create-plan-form' onSubmit={this.handleSubmit}>
                    <div className='formRow'>
                        <Input
                            type='text'
                            placeholder='Name'
                            required
                            inputProps={{ maxLength: 50 }}
                        />
                    </div>
                    <div className='formRow'>
                        <TextField
                            type='text'
                            placeholder='Description'
                            required
                            inputProps={{ maxLength: 500 }}
                        />
                    </div>
                    <div className='formRow'>Pdf Upload Goes here.</div>
                    <div className='formRow'>
                        <Connect query={graphqlOperation(queries.listTools)}>
                            {({
                                data: { listTools },
                                loading,
                            }: {
                                data: graphQLModels.ListToolsQuery;
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
                            query={graphqlOperation(queries.listMaterials)}>
                            {({
                                data: { listMaterials },
                                loading,
                            }: {
                                data: graphQLModels.ListMaterialsQuery;
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
                            variant='contained'
                            color='primary'
                            type='submit'>
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
