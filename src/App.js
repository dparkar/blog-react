import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import logo from './logo.svg';
import './App.css';
import { pushRotate as Menu } from 'react-burger-menu';

const Page = ({ title }) =>
  <div className="App">
    <head>
      <title>
        {title} | Dhawal Parkar
      </title>
    </head>
    <div className="App-header">
      {title === 'Logs' ? <label> Dhawal Parkar logs ...</label> : title}
    </div>
    <p className="App-intro">
      This is the {title} page.
    </p>
    <div className="App-footer">
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  </div>;

const Logs = props => <Page title="Logs" />;
const About = props => <Page title="About" />;

class App extends Component {
  render() {
    return (
      <div id="outer-container">
        <Router history={browserHistory}>
          <Route path="/" component={Logs} />
          <Route path="/about" component={About} />
        </Router>
      </div>
    );
  }
}

export default App;
