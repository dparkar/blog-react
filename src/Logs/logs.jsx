import React from 'react';
import { Link } from 'react-router-dom';
import { TrackedComponent } from 'react-appinsights';
import GitHub from 'github-api';
import { Wave } from 'better-react-spinkit';

import './logs.css';

let repo;
const user = 'dparkar';
const repoName = 'blog-react';
const repoBranch = 'dev/dparkar/social/bu65';
const repoContentPath = 'content';
const repoLogsMetadataFile = 'logs.json';

export default class Logs extends TrackedComponent {
  constructor(props) {
    super(props);
    var tag = this.props.tag;
    var gh = new GitHub();
    // get the repo
    repo = gh.getRepo(user, repoName);
    // get the logs metadata
    repo.getContents(
      repoBranch,
      repoContentPath + '/' + repoLogsMetadataFile,
      true,
      (err, logs) => {
        if (err) {
          console.log(err); // we can't get the data, for some reason
          return;
        }

        if (tag !== undefined) {
          console.log('filtering');
          logs = logs.filter(log => log.tags.include(tag));
        }
        this.setState({ logs: logs });
      }
    );
    // Intialize state
    this.state = {
      logs: []
    };
  }

  render() {
    let logs;
    if (this.state.logs.length === 0) {
      logs = (
        <div className="waiter">
          <Wave size={100} color="white" />
        </div>
      );
    } else {
      logs = this.state.logs.map(log => {
        return (
          <div className="logmetadata">
            <Link id={log.title} to={'/log/' + log.title}>
              <div className="logtitle">
                {log.title}
              </div>
              <div className="logdatetime">
                {log.datetime}
              </div>
            </Link>
            <div className="clearboth" />
          </div>
        );
      });
    }
    return (
      <div className="logs">
        <title>logs | dhawal parkar</title>
        {logs}
      </div>
    );
  }
}
