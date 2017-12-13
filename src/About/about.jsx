import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import './about.css';

export default class About extends TrackedComponent {
  render() {
    return (
      <div className="About">
        <title> about | dhawal parkar </title>
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
        <meta
          property="og:description"
          content="Artificial Intelligence and Robotics"
        />
        <meta property="fb:app_id" content="367989410291145" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@dparkar" />
        <p>Visual Studio Team Services</p>
        <p>Github</p>
        <p>Stackoverflow</p>
        <p>LinkedIn</p>
        <p>Twitter</p>
      </div>
    );
  }
}
