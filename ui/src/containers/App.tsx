import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import HomeComponent from '../components/home/Home.component';
import DashboardComponent from '../components/dashboard/Dashboard.component';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <header>
            <Link to="/" className="nav-item">
              Mission Trip Furniture
            </Link>
            <Link to="/dashboard" className="nav-item">
              Dashboard
            </Link>
          </header>
          <Route exact path="/" component={HomeComponent} />
          <Route path="/dashboard" component={DashboardComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
