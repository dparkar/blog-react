import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import { Link } from 'react-router-dom';
import Alert from 'react-s-alert';
import FontAwesome from 'react-fontawesome';
import Logs from '../Logs/logs.jsx';
import LogDetails from '../LogDetails/logdetails.jsx';
import Stats from '../Stats/stats.jsx';
import About from '../About/about.jsx';
import Share from '../Share/share.jsx';
import Err from '../Err/err.jsx';
import logo from '../logo.svg';
import './page.css';

export default class Page extends TrackedComponent {
  render() {
    var title = this.props.title;
    var sec = <Err />;
    var logsnavlinkfontclassname = 'navlinkfont';
    var statsnavlinkfontclassname = 'navlinkfont';
    var aboutnavlinkfontclassname = 'navlinkfont';
    switch (title) {
      case 'Logs':
        sec = <Logs />;
        logsnavlinkfontclassname = 'navlinkfontselected';
        break;
      case 'LogDetails':
        sec = <LogDetails logtitle={this.props.logtitle} />;
        break;
      case 'Stats':
        sec = <Stats />;
        statsnavlinkfontclassname = 'navlinkfontselected';
        break;
      case 'About':
        sec = <About />;
        aboutnavlinkfontclassname = 'navlinkfontselected';
        break;
      default:
        sec = <Err />;
    }

    return (
      <div className="Page">
        <div className="Page-header">
          <div className="header">
            <b>d</b>hawal <b>p</b>arkar <b>logs</b> ...
          </div>
          <div className="nav">
            <Link id="about" className="navlink" to="/about">
              <FontAwesome name="info" className={aboutnavlinkfontclassname} />
            </Link>
            <Link id="stats" className="navlink" to="/stats">
              <FontAwesome
                name="bar-chart-o"
                className={statsnavlinkfontclassname}
              />
            </Link>
            <Link id="logs" className="navlink" to="/">
              <FontAwesome
                name="file-text-o"
                className={logsnavlinkfontclassname}
              />
            </Link>
          </div>
          <div className="clearboth" />
        </div>
        <div className="Page-content">
          {sec}
        </div>
        <div className="Page-footer">
          <div className="logsocial">
            <Share shareURL={window.location.href} />
          </div>
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
