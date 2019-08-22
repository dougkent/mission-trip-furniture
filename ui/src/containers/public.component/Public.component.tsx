// React
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// MTF
import NavComponent from '../../components/nav.component/Nav.component';
import PlansListComponent from '../../components/plans-list.component/PlansList.component';
import PlanViewComponent from '../../components/plan-view.component/PlanView.component';

class PublicComponent extends React.Component {
    render() {
        return (
            <div>
                <NavComponent />
                <Router>
                    <Route exact path="/plans" component={PlansListComponent} />
                    <Route path="/plans/:planUrl" component={PlanViewComponent} />
                </Router>
            </div>
        );
    }
}

export default PublicComponent;