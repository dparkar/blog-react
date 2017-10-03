import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import GitHub from 'github-api';
import ReactMarkdown from 'react-markdown';
import { Collapse } from 'react-collapse';
import './logs.css';

const user = 'dparkar';
const repoName = 'blog-react';
//const repoBranch = 'master';
const repoBranch = 'dev/dparkar/multipleposts/ta41';
const repoContentPath = 'content';
const repoLogsMetadataFile = 'logs.json';

export default class Logs extends TrackedComponent {
  constructor(props) {
    super(props);
    var gh = new GitHub();
    // get the repo
    var repo = gh.getRepo(user, repoName);
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
        // // go through each file in the folder
        // files.forEach(function(file) {
        //   repo.getContents(
        //     repoBranch,
        //     repoContentPath + '/' + file.name,
        //     true,
        //     (err2, content) => {
        //       if (err2) {
        //         console.log(err2); // we can't have the data, for some reason
        //         return;
        //       }
        //       console.log(content);
        //       this.setState({ logs: content });
        //     }
        //   );
        // }, this);
      }
    );
    // Update state
    this.state = {
      logs: []
    };
  }
  handleFocus(e) {
    console.log('focussed');
  }
  render() {
    let logTitles;
    if (this.state.logs.length === 0) {
      logTitles = <p>retrieving logs ...</p>;
    } else {
      logTitles = this.state.logs.map(log =>
        <div key={log.datetime}>
          <br />
          <Collapse isOpened={true} onFocus={this.handleFocus}>
            {log.datetime + '_' + log.title}
            <br />
            {'[' + log.tags + ']'}
          </Collapse>
          <br />
        </div>
      );
    }

    return (
      <div className="Logs">
        {logTitles}
        <p>work in progress ...</p>
        <p>
          See code here : {' '}
          <a href="https://github.com/dparkar/blog-react">
            https://github.com/dparkar/blog-react
          </a>
        </p>
      </div>
    );
  }
}
