// React
import React from 'react';

// AWS
import Amplify from 'aws-amplify';
import aws_exports from '../../aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

// Material
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';

// MTF
import { signUpConfig } from '../../models/sign-up-config.model';
import './PlanCreate.component.scss';
import { Button } from '@material-ui/core';
import MaterialsSelectorComponent from '../../components/materials-selector.component/MaterialsSelector.component';

// Configure
Amplify.configure(aws_exports);


class PlanCreateComponent extends React.Component {

    render() {
        return (
            <div>
                <h1>Create Plan</h1>
                <form>
                    <div className="formRow">
                        <Input type="text"
                            placeholder="Name"
                            required
                            inputProps={{ maxLength: 50 }} />
                    </div>
                    <div className="formRow">
                        <TextField type="text"
                            placeholder="Description"
                            required
                            inputProps={{ maxLength: 500 }} />
                    </div>
                    <div className="formRow">
                        Pdf Upload Goes here.
                    </div>
                    <div className="formRow">
                        Tool Selector Goes here.
                    </div>
                    <div className="formRow">
                        <MaterialsSelectorComponent />
                    </div >
                    <div className="formRow">
                        Image Upload Goes here.
                    </div>
                    <div className="formRow">
                        <Button variant="contained" color="primary" >
                            Create Plan
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withAuthenticator(PlanCreateComponent, {
    signUpConfig: signUpConfig
});