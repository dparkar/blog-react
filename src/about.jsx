import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import './about.css';

export default class About extends TrackedComponent {
  render() {
    return (
      <div className="About">
        <p>Visual Studio Team Services</p>
        <p>Github</p>
        <p>Stackoverflow</p>
        <p>LinkedIn</p>
        <p>Twitter</p>
      </div>
    );
  }
}
