import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import GitHub from 'github-api';
import ReactMarkdown from 'react-markdown';
import { Collapse } from 'react-collapse';
import { presets } from 'react-motion';
import './logs.css';

let repo;
const user = 'dparkar';
const repoName = 'blog-react';
const repoBranch = 'master';
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
        logs.forEach(function(log) {
          log['selected'] = false;
          log['content'] = '';
        }, this);
        logs[0]['selected'] = true;
        repo.getContents(
          repoBranch,
          repoContentPath + '/' + logs[0].filename,
          true,
          (err, content) => {
            if (err) {
              console.log(err); // we can't have the data, for some reason
              return;
            }
            logs[0].content = content;
            this.setState({ logs: logs });
          }
        );
        this.setState({ logs: logs });
      }
    );
    // Intialize state
    this.state = {
      logs: []
    };
  }
  handleClick = e => {
    var logIndex = this.state.logs.findIndex(
      log => log.datetime === e.currentTarget.dataset.id
    );
    var logs = this.state.logs;
    logs.forEach(function(log) {
      log['selected'] = false;
    }, this);
    var log = this.state.logs[logIndex];
    if (log.content === '') {
      repo.getContents(
        repoBranch,
        repoContentPath + '/' + log.filename,
        true,
        (err, content) => {
          if (err) {
            console.log(err); // we can't have the data, for some reason
            return;
          }
          log.content = content;
          log.selected = true;
          logs[logIndex] = log;
          this.setState({ logs: logs });
        }
      );
    } else {
      log.selected = true;
      logs[logIndex] = log;
      this.setState({ logs: logs });
    }
  };
  render() {
    let logTitles;
    if (this.state.logs.length === 0) {
      logTitles = <p>retrieving logs ...</p>;
    } else {
      logTitles = this.state.logs.map(log => {
        if (log.selected) {
          return (
            <Collapse
              key={log.datetime}
              isOpened={true}
              onClick={this.handleClick}
              data-id={log.datetime}
              springConfig={presets.wobbly}
            >
              {log.datetime + '_' + log.title} {'[' + log.tags + ']'}
              <ReactMarkdown source={log.content} />
            </Collapse>
          );
        } else {
          return (
            <Collapse
              key={log.datetime}
              isOpened={true}
              onClick={this.handleClick}
              data-id={log.datetime}
              springConfig={presets.wobbly}
            >
              {log.datetime + '_' + log.title} {'[' + log.tags + ']'}
            </Collapse>
          );
        }
      });
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
