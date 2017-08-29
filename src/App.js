import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import logo from './logo.svg';
import './App.css';
import ReactMarkdown from 'react-markdown';
var base64 = require('js-base64').Base64;

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
  constructor(props) {
    console.log('constructor');
    super(props);
    const url =
      'https://api.github.com/repos/dparkar/blog-react/contents/content/2017-08-20_19:27.md';
    fetch(url)
      .then(response => response)
      //.then(body => input = base64.decode(body));
      .then(body => (this.state = { body: body }));
    this.state = { date: new Date() };
  }
  componentWillMount() {
    console.log('componentWillMount');
  }
  componentDidMount() {
    console.log('componentDidMount');
    this.timerID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    console.log('componentWillUnmount');
    clearInterval(this.timerID);
  }
  tick() {
    this.setState({
      date: new Date()
    });
  }
  render() {
    console.log('render');
    return (
      <div>
        {/* <Router history={browserHistory}>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
        </Router  > */}
        <p>
          It is {this.state.date.toLocaleTimeString()}.
        </p>
      </div>
    );
  }
}

export default App;
