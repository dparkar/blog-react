import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import FontAwesome from 'react-fontawesome';
import MetaTags from 'react-meta-tags';

import './about.css';

export default class About extends TrackedComponent {
  render() {
    return (
      <div className="about">
        <MetaTags>
          <title>about | dhawal parkar</title>
          <meta
            property="og:description"
            content="Artificial Intelligence and Robotics"
          />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="dplogs" />
          <meta property="og:title" content="about | dhawal parkar" />
          <meta property="og:url" content="http://dplogs.com/about" />
          <meta
            property="og:image"
            content="https://dplogscontent.blob.core.windows.net/dplogs/metaimage_250_250.png"
          />
          <meta property="og:image:alt" content="dplogs" />
          <meta property="og:image:width" content="250" />
          <meta property="og:image:height" content="250" />
          <meta property="fb:app_id" content="367989410291145" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="@dparkar" />
        </MetaTags>
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
