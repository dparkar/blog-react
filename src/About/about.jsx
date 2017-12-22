import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import FontAwesome from 'react-fontawesome';

import './about.css';

export default class About extends TrackedComponent {
  render() {
    document.title = 'about | dhawal parkar';
    document.getElementsByTagName('META')[3].content = 'about | dhawal parkar';
    document.getElementsByTagName('META')[4].content =
      'http://dplogs.com/about';

    return (
      <div className="about">
        <div className="aboutcontent">
          <a
            href="https://www.linkedin.com/in/dparkar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesome name="linkedin" size="2x" />
          </a>
          <a
            href="https://twitter.com/dparkar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesome name="twitter" size="2x" />
          </a>
          <a
            href="https://github.com/dparkar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesome name="github" size="2x" />
          </a>
          <a
            href="https://stackoverflow.com/users/805588/dparkar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesome name="stack-overflow" size="2x" />
          </a>
        </div>
      </div>
    );
  }
}
