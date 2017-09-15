import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import Page from './page.jsx';

const Logs = props => <Page title="Logs" />;
const Stats = props => <Page title="Stats" />;
const About = props => <Page title="About" />;
const Err = props => <Page title="Err" />;

export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Logs} />
        <Route path="/stats" component={Stats} />
        <Route path="/about" component={About} />
        <Route path="*" component={Err} />
      </Router>
    );
  }
}
