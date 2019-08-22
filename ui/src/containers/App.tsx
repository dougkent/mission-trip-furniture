// React
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// MTF
import PublicComponent from './public.component/Public.component';
import MyMtfComponent from './my-mtf.component/MyMtf.component';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Route exact path="/" component={PublicComponent} />
          <Route path="/my-mtf" component={MyMtfComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
