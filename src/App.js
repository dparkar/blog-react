// import { React, Component } from 'react';
// import { Router, browserHistory, Route } from 'react-router';
// import Page from './Page';
// import './App.css';

// const Logs = props => <Page title="Logs" />;
// const About = props => <Page title="About" />;

// export default class App extends Component {
//   render() {
//     return (
//       <div>
//       <Router history={browserHistory}>
//         <Route path="/" component={Logs} />
//         <Route path="/about" component={About} />
//       </Router>
//     </div>
//     );
//   }
// }

import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import logo from './logo.svg';
import './App.css';
import { pushRotate as Menu } from 'react-burger-menu';

const Page = ({ title }) =>
  <div className="App" id="outer-container">
    <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
      <a id="logs" className="menu-item" href="/">
        Logs
      </a>
      <a id="about" className="menu-item" href="/about">
        About
      </a>
    </Menu>
    <main id="page-wrap">
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
    </main>
  </div>;

const Logs = props => <Page title="Logs" />;
const About = props => <Page title="About" />;

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Logs} />
        <Route path="/about" component={About} />
      </Router>
    );
  }
}

export default App;
