import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomeComponent from '../components/home.component/Home.component';
import DashboardComponent from '../components/dashboard.component/Dashboard.component';
import NavComponent from '../components/nav.component/Nav.component';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <NavComponent />
          <Route exact path="/" component={HomeComponent} />
          <Route path="/dashboard" component={DashboardComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
