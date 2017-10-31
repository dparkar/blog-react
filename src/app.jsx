import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TrackedComponent } from 'react-appinsights';
import Page from './page.jsx';

const Logs = props =>
  <Page logtitle={props.match.params.logtitle} title="Logs" />;
const Stats = props => <Page title="Stats" />;
const About = props => <Page title="About" />;
const Err = props => <Page title="Err" />;

export default class App extends TrackedComponent {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" render={Logs} />
          <Route exact path="/log/:logtitle" render={Logs} />
          <Route exact path="/stats" component={Stats} />
          <Route exact path="/about" component={About} />
          <Route path="*" component={Err} />
        </Switch>
      </div>
    );
  }
}
