// React
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// AWS
import Amplify from 'aws-amplify';
import aws_exports from '../../aws-exports';
import { withAuthenticator } from 'aws-amplify-react';

// MTF
import NavComponent from '../../components/nav.component/Nav.component';
import DashboardComponent from '../../components/dashboard.component/DasboardComponent';
import PlanEditComponent from '../../components/plan-edit.componet/PlanEdit.component';
import PlanCreateComponent from '../../components/plan-create.component/PlanCreate.component';

// Configure
Amplify.configure(aws_exports);

const signUpConfig = {
    hideAllDefaults: true,
    signUpFields: [
        {
            label: 'Email',
            key: 'email',
            required: true,
            displayOrder: 1,
            type: 'string',
        },

        {
            label: 'Name',
            key: 'name',
            required: true,
            displayOrder: 2,
            type: 'string',
        },
        {
            label: 'Username',
            key: 'username',
            required: true,
            displayOrder: 3,
            type: 'string',
        },
        {
            label: 'Password',
            key: 'password',
            required: true,
            displayOrder: 4,
            type: 'password',
        }
    ]
}

class MyMtfComponent extends React.Component {
    render() {
        return (
            <div>
                <NavComponent />
                <Router>
                    <Route exact to="/my-mtf" component={DashboardComponent} />
                    <Route exact to="/my-mtf/plans/:planUrl" component={PlanEditComponent} />
                    <Route exact to="/my-mtf/plans/create" component={PlanCreateComponent} />
                </Router>
            </div>
        );
    }
}

export default withAuthenticator(MyMtfComponent, {
    signUpConfig: signUpConfig
});