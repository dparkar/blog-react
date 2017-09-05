import React, { Component } from 'react';
import { pushRotate as Menu } from 'react-burger-menu';
import logo from './logo.svg';
import './Page.css';

export default class Page extends Component {
  render() {
    var title = this.props.title;
    return (
      <div className="Page" id="outer-container">
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
          <div className="Page-header">
            {title === 'Logs' ? <label> Dhawal Parkar logs ...</label> : title}
          </div>
          <p className="Page-content">
            This is the {title} page.
          </p>
          <div className="Page-footer">
            <img src={logo} className="Page-logo" alt="logo" />
          </div>
        </main>
      </div>
    );
  }
}