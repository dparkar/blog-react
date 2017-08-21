import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import logo from './logo.svg';
import './App.css';
import ReactMarkdown from 'react-markdown';

var input = '# This is a header\n\nAnd this is a paragraph';

const Page = ({ title }) =>
  <div className="App">
    <div className="App-header">
      <h2>
        {title}
      </h2>
    </div>
    <p className="App-intro">
      This is the {title} page.
    </p>
    <div className="App-navigation">
      <Link to="/">Home</Link>
      <br />
      <Link to="/about">About</Link>
    </div>
    <ReactMarkdown source={input} />

    <div className="App-footer">
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  </div>;

const Home = props => <Page title="Home" />;
const About = props => <Page title="About" />;

class App extends Component {
  componentWillMount() {
    const url =
      'https://api.github.com/repos/dparkar/blog-react/contents/README.md';
    fetch(url)
      .then(response => response) // i've tried with and without .json()
      .then(body => console.log(body));
    // this logs the same response
  }
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </Router>
    );
  }
}

export default App;
