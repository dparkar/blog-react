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
          <meta id="1" name="description" content="Some description." />
          <meta id="2" property="og:title" content="MyApp" />
          <meta id="3" property="og:image" content="path/to/image.jpg" />
          <meta id="4" property="og:type" content="website" />
          <meta id="5" property="og:site_name" content="dplogs" />
          <meta id="6" property="og:title" content="about | dhawal parkar" />
          <meta id="7" property="og:url" content="http://dplogs.com/about" />
          <meta
            id="8"
            property="og:image"
            content="https://dplogscontent.blob.core.windows.net/dplogs/metaimage_250_250.png"
          />
          <meta id="9" property="og:image:alt" content="dplogs" />
          <meta id="10" property="og:image:width" content="250" />
          <meta id="11" property="og:image:height" content="250" />
          <meta
            id="12"
            property="og:description"
            content="Artificial Intelligence and Robotics"
          />
          <meta id="13" property="fb:app_id" content="367989410291145" />
          <meta id="14" name="twitter:card" content="summary" />
          <meta if="15" name="twitter:creator" content="@dparkar" />
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
