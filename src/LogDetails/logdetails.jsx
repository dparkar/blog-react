import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import GitHub from 'github-api';
import ReactMarkdown from 'react-markdown';
import ReactDisqusThread from 'react-disqus-thread';
import { Collapse } from 'react-collapse';
import { presets } from 'react-motion';
import Share from '../Share/share.jsx';

import './logdetails.css';
import './s-alert-flip.css';

let repo;
const user = 'dparkar';
const repoName = 'blog-react';
const repoBranch = 'master';
const repoContentPath = 'content';

export default class LogDetails extends TrackedComponent {
  constructor(props) {
    super(props);
    var logfilename = this.props.logfilename;
    console.log('logfilename:' + logfilename);
    var gh = new GitHub();
    // get the repo
    repo = gh.getRepo(user, repoName);
    // get the logs metadata
    repo.getContents(
      repoBranch,
      repoContentPath + '/' + logfilename,
      true,
      (err, logdetails) => {
        if (err) {
          console.log(err); // we can't get the data, for some reason
          return;
        }

        this.setState({ logfilename: logfilename, logdetails: logdetails });
      },
      this
    );
    // Intialize state
    this.state = { logfilename: logfilename };
  }

  render() {
    let fullcontent;
    if (this.state.logdetails === undefined) {
      fullcontent = (
        <p>
          retrieving log details for {this.state.logfilename}
        </p>
      );
    } else {
      fullcontent = (
        <Collapse isOpened={true} springConfig={presets.wobbly}>
          <div className="detailsordiscuss">
            <ReactMarkdown source={this.state.logdetails} />
          </div>
        </Collapse>
      );
    }

    return (
      <div className="Logs">
        {fullcontent}
        <div className="tagsandsocial">
          <div className="logsocial">
            <Share
              shareURL={'http://dplogs.com/log/' + this.state.logfilename}
            />
          </div>
          <div className="clearboth" />
        </div>
        <div className="detailsordiscuss">
          <ReactDisqusThread
            shortname={this.state.logfilename}
            identifier={this.state.logfilename}
            title={this.state.logfilename}
            url={'http://dplogs.com/log/' + this.state.logfilename}
          />
        </div>
      </div>
    );
  }
}
