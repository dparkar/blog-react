import React, { Component } from 'react';
import { pushRotate as Menu } from 'react-burger-menu';
import logo from './logo.svg';
import './Page.css';
import Logs from './Logs.js';
import Stats from './Stats.js';
import About from './About.js';
import Err from './Err.js';

const Sections = { Logs, Stats, About, Err };

export default class Page extends Component {
  render() {
    var title = this.props.title;
    var sec = Sections[title];
    if (sec === '') {
      sec = Sections[Sections.length - 1];
    }

    return (
      <div className="Page" id="outer-container">
        <Menu pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
          <a id="logs" className="menu-item" href="/">
            Logs
          </a>
          <a id="stats" className="menu-item" href="/stats">
            Stats
          </a>
          <a id="about" className="menu-item" href="/about">
            About
          </a>
        </Menu>
        <main id="page-wrap">
          <title>
            {title} | Dhawal Parkar
          </title>
          <div className="Page-header">
            <label> Dhawal Parkar logs ...</label>
          </div>
          {React.createElement(sec)}
          {<sec />}
          <div className="Page-footer">
            <img src={logo} className="Page-logo" alt="logo" />
          </div>
        </main>
      </div>
    );
  }
}
