// React
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// MTF
import './App.scss';
import HomeComponent from './home.component/Home.component';
import PlansListComponent from './plans-list.component/PlansList.component';
import PlanViewComponent from './plan-view.component/PlanView.component';
import NavComponent from '../components/nav.component/Nav.component';
import DashboardComponent from './dashboard.component/Dashboard.component';
import PlanCreateComponent from './plan-create.component/PlanCreate.component';
import PlanEditComponent from './plan-edit.componet/PlanEdit.component';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <NavComponent />
          <Route exact path='/' component={HomeComponent} />
          <Route exact path='/plans' component={PlansListComponent} />
          <Route path='/plans/:planUrl' component={PlanViewComponent} />
          <Route exact path='/my-mtf' component={DashboardComponent} />
          <Route
            exact
            path='/my-mtf/create-plan'
            component={PlanCreateComponent}
          />
          <Route path='/my-mtf/plans/:planUrl' component={PlanEditComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
