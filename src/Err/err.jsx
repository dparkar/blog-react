import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import './err.css';

export default class Err extends TrackedComponent {
  render() {
    return (
      <div className="Err">
        <title>err | dhawal parkar</title>
        <img src="http://i.imgur.com/5cbzqFj.gif" alt="Error" />
      </div>
    );
  }
}
