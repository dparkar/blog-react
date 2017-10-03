import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import GitHub from 'github-api';
import ReactMarkdown from 'react-markdown';
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
    // get the folder contents
    repo.getContents(
      repoBranch,
      repoContentPath + '/' + repoLogsMetadataFile,
      true,
      (err, logs) => {
        if (err) {
          console.log(err); // we can't get the data, for some reason
          return;
        }
        console.log(logs);
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
      //repoName: repoName,
      logs: []
    };
  }

  render() {
    var logTitles = [];
    if (this.state.logs.length === 0) {
      logTitles.push(<p>retrieving logs ...</p>);
    } else {
      this.state.logs.map(log => {
        logTitles.push(
          <a
            href={
              'https://github.com/dparkar/blog-react/blob/dev/dparkar/multipleposts/ta41/' +
              repoContentPath +
              '/' +
              log.filename
            }
          >
            {log.datetime + '_' + log.title}
          </a>
        );
        logTitles.push(<br />);
        logTitles.push('Tags : ' + log.tags);
        logTitles.push(<br />);
        return logTitles;
      });
    }

    return (
      <div className="Logs">
        {logTitles}
        <p>work in progress ...</p>
        <img
          src="https://i.makeagif.com/media/10-27-2015/_jDzHB.gif"
          alt="work in progress"
        />
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
