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
          <Link id={log.title} to={'/log/' + log.title}>
            <div className="logmetadata">
              <div className="logtitle">
                {log.title}
              </div>
              <div className="logdatetime">
                {log.datetime}
              </div>
              <div className="clearboth" />
            </div>
          </Link>
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
