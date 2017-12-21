import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import GitHub from 'github-api';
import ReactMarkdown from 'react-markdown';

import './logdetails.css';

let repo;
const user = 'dparkar';
const repoName = 'blog-react';
const repoBranch = 'dev/dparkar/social/bu65';
const repoContentPath = 'content';

export default class LogDetails extends TrackedComponent {
  constructor(props) {
    super(props);
    var logtitle = this.props.logtitle;
    console.log('logtitle:' + logtitle);
    var gh = new GitHub();
    // get the repo
    repo = gh.getRepo(user, repoName);
    // get the logs metadata
    repo.getContents(
      repoBranch,
      repoContentPath + '/' + logtitle + '.md',
      true,
      (err, logdetails) => {
        if (err) {
          console.log(err); // we can't get the data, for some reason
          return;
        }

        this.setState({ logtitle: logtitle, logdetails: logdetails });
      },
      this
    );
    // Intialize state
    this.state = { logtitle: logtitle };
  }

  render() {
    let fullcontent;
    if (this.state.logdetails === undefined) {
      fullcontent = (
        <p>
          retrieving log details for {this.state.logtitle}
        </p>
      );
    } else {
      fullcontent = <ReactMarkdown source={this.state.logdetails} />;
    }

    return (
      <div>
        <title>
          {this.state.logtitle} | dhawal parkar
        </title>
        <div className="detailsordiscuss">
          {fullcontent}
        </div>
      </div>
    );
  }
}
