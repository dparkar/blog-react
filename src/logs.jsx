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
    console.log(this.props.logtitle);
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

        var logtitle = this.props.logtitle;
        var logindex = 0;
        var selectedlogindex;
        logs.forEach(function(log) {
          if (log['title'] === logtitle) {
            log['selected'] = true;
            selectedlogindex = logindex;
          } else if (logtitle === undefined && logindex === 0) {
            log['selected'] = true;
            selectedlogindex = logindex;
          } else {
            log['selected'] = false;
          }

          log['content'] = '';

          logindex++;
        }, this);

        if (selectedlogindex !== undefined) {
          repo.getContents(
            repoBranch,
            repoContentPath + '/' + logs[selectedlogindex].filename,
            true,
            (err, content) => {
              if (err) {
                console.log(err); // we can't have the data, for some reason
                return;
              }
              logs[selectedlogindex].content = content;
              this.setState({ logs: logs });
            }
          );
        }

        this.setState({ logs: logs });
      }
    );
    // Intialize state
    this.state = {
      logs: []
    };
  }

  handleClick = e => {
    var logs = this.state.logs;

    var logIndex = logs.findIndex(
      log => log.datetime === e.currentTarget.dataset.id
    );

    var log = logs[logIndex];

    if (log.selected === true) {
      log.selected = false;
    } else {
      logs.forEach(function(log) {
        log.selected = false;
      }, this);
      log.selected = true;
    }

    if (log.selected && log.content === '') {
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
          logs[logIndex] = log;
          this.setState({ logs: logs });
        }
      );
    }

    logs[logIndex] = log;
    this.setState({ logs: logs });
  };

  render() {
    let logs;
    if (this.state.logs.length === 0) {
      logs = <p>retrieving logs ...</p>;
    } else {
      logs = this.state.logs.map(log => {
        let logMetadata = (
          <div className="logmetadata">
            <div className="logdatetime">
              {log.datetime}
            </div>
            <div className="logtags">
              {'[' + log.tags + ']'}
            </div>
            <div className="logtitle">
              {log.title}
            </div>
            <div className="clearboth" />
          </div>
        );
        if (log.selected) {
          return (
            <Collapse
              key={log.datetime}
              isOpened={true}
              onClick={this.handleClick}
              data-id={log.datetime}
              springConfig={presets.wobbly}
            >
              {logMetadata}
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
              {logMetadata}
            </Collapse>
          );
        }
      });
    }

    return (
      <div className="Logs">
        {logs}
      </div>
    );
  }
}
