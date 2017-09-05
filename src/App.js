import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import Page from './Page.js';
import './App.css';

const Logs = props => <Page title="Logs" />;
const About = props => <Page title="About" />;

export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Logs} />
        <Route path="/about" component={About} />
      </Router>
    );
  }
}
