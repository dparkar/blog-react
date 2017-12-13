import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import { Link } from 'react-router-dom';
import Alert from 'react-s-alert';
import Logs from '../Logs/logs.jsx';
import LogDetails from '../LogDetails/logdetails.jsx';
import Stats from '../Stats/stats.jsx';
import About from '../About/about.jsx';
import Err from '../Err/err.jsx';
import logo from '../logo.svg';
import './page.css';
import './s-alert-default.css';
import './s-alert-bouncyflip.css';

export default class Page extends TrackedComponent {
  render() {
    var title = this.props.title;
    var sec = <Err />;
    switch (title) {
      case 'Logs':
        sec = <Logs />;
        break;
      case 'LogDetails':
        sec = <LogDetails logfilename={this.props.logfilename} />;
        break;
      case 'Stats':
        sec = <Stats />;
        break;
      case 'About':
        sec = <About />;
        break;
      default:
        sec = <Err />;
    }

    return (
      <div className="Page">
        <title>
          {title.toLowerCase()} | dhawal parkar
        </title>
        <Link id="logs" className="menu-item" to="/">
          logs
        </Link>
        <Link id="stats" className="menu-item" to="/stats">
          stats
        </Link>
        <Link id="about" className="menu-item" to="/about">
          about
        </Link>
        <div className="Page-header">
          <b>d</b>hawal <b>p</b>arkar <b>logs</b> ...
        </div>
        <div className="Page-content">
          {sec}
        </div>
        <div className="Page-footer">
          <a
            href="https://github.com/dparkar/blog-react"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logo} className="Page-logo" alt="logo" />
          </a>
        </div>
        <Alert stack={{ limit: 3 }} />
      </div>
    );
  }
}
