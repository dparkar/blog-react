import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import './stats.css';

export default class Stats extends TrackedComponent {
  render() {
    return (
      <div className="Logs">
        <title>stats | dhawal parkar</title>
        <div className="stats">
          <h1>show me the data</h1>
        </div>
      </div>
    );
  }
}
