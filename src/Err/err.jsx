import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import './err.css';

export default class Err extends TrackedComponent {
  render() {
    document.title = 'err | dhawal parkar';
    document.getElementsByTagName('META')[3].content = 'err | dhawal parkar';
    document.getElementsByTagName('META')[4].content = 'http://dplogs.com/err';
    return (
      <div className="err">
        <title>err | dhawal parkar</title>
        <img src="http://i.imgur.com/5cbzqFj.gif" alt="Error" />
      </div>
    );
  }
}
