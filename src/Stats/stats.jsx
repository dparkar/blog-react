import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import './stats.css';

export default class Stats extends TrackedComponent {
  render() {
    document.title = 'stats | dhawal parkar';
    document.getElementsByTagName('META')[3].content = 'stats | dhawal parkar';
    document.getElementsByTagName('META')[4].content =
      'http://dplogs.com/stats';

    return (
      <div className="Logs">
        <div className="stats">
          <h1>soon</h1>
        </div>
      </div>
    );
  }
}
