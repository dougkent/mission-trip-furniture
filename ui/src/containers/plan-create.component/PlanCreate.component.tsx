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
import { graphQLModels, Plan, Material, Tool } from '../../models';

// Configure
Amplify.configure(aws_exports);

class CreatePlan extends React.Component<{}, Plan> {
    constructor(props: any) {
        super(props);

        this.state = {
            id: uuid(),
            name: '',
            description: '',
            materials: [],
            tools: [],
            created: new Date(),
            createdBy: '',
        };
    }

    async componentDidMount() {
        const user = await Auth.currentAuthenticatedUser();

        const userResult = await API.graphql(
            graphqlOperation(queries.getUser, { username: user.username })
        );

        this.setState({
            createdBy: userResult.username,
        });
    }

    handleTextChange = (event: React.ChangeEvent) => {
        const element = event.target as HTMLInputElement;
        const key: string = element.name;
        const value: string = element.value;

        this.setState((prevState: Plan) => ({
            ...prevState,
            [key]: value,
        }));
    };

    handleMaterialSelected = (materials: Material[]) => {
        this.setState({
            materials: materials,
        });
    };

    handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        await this.setState({
            created: new Date(),
        });

        console.log(this.state);

        // const result = await API.graphql(
        //     graphqlOperation(mutations.createPlan, this.state)
        // );
        // console.log(result);
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
