import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import './stats.css';

export default class Stats extends TrackedComponent {
  render() {
    return (
      <div className="Logs">
        <title>stats | dhawal parkar</title>
        <h1>Statistics</h1>
      </div>
    );
  }
}
