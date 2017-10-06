import React from 'react';
import { pushRotate as Menu } from 'react-burger-menu';
import { TrackedComponent } from 'react-appinsights';
import logo from './logo.svg';
import Logs from './logs.jsx';
import Stats from './stats.jsx';
import About from './about.jsx';
import Err from './err.jsx';
import './page.css';

const Sections = { Logs, Stats, About, Err };

export default class Page extends TrackedComponent {
  render() {
    var title = this.props.title;
    var sec = Sections[title];
    if (sec === '') {
      sec = Sections[Sections.length - 1];
    }

    return (
      <div className="Page">
        <title>
          {title} | Dhawal Parkar
        </title>
        <div id="outer-container">
          <Menu
            className="menu"
            pageWrapId={'page-wrap'}
            outerContainerId={'outer-container'}
            width={'20vh'}
          >
            <a id="logs" className="menu-item" href="/">
              logs
            </a>
            <a id="stats" className="menu-item" href="/stats">
              stats
            </a>
            <a id="about" className="menu-item" href="/about">
              about
            </a>
          </Menu>
          <main id="page-wrap">
            <div className="Page-header">
              <b>d</b>hawal <b>p</b>arkar <b>logs</b> ...
            </div>
            <div className="Page-content">
              {React.createElement(sec)}
            </div>
            <div className="Page-footer">
              <a href="https://github.com/dparkar/blog-react">
                <img src={logo} className="Page-logo" alt="logo" />
              </a>
            </div>
          </main>
        </div>
      </div>
    );
  }
}
