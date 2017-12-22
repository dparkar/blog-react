import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import MetaTags from 'react-meta-tags';
import './stats.css';

export default class Stats extends TrackedComponent {
  render() {
    return (
      <div className="Logs">
        <MetaTags>
          <title>stats | dhawal parkar</title>
          <meta
            property="og:description"
            content="Artificial Intelligence and Robotics"
          />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="dplogs" />
          <meta property="og:title" content="stats | dhawal parkar" />
          <meta property="og:url" content="http://dplogs.com/stats" />
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
        <div className="stats">
          <h1>soon</h1>
        </div>
      </div>
    );
  }
}
