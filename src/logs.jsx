import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import GitHub from 'github-api';
import ReactMarkdown from 'react-markdown';
import { Collapse } from 'react-collapse';
import { presets } from 'react-motion';
import Alert from 'react-s-alert';

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

        var logtitle = this.props.logtitle;
        var logindex = 0;
        var selectedlogindex = null;
        var directtolog = false;
        logs.forEach(function(log) {
          if (log['title'] === logtitle) {
            log['selected'] = true;
            selectedlogindex = logindex;
            directtolog = true;
          } else if (logtitle === undefined && logindex === 0) {
            log['selected'] = true;
            selectedlogindex = logindex;
          } else {
            log['selected'] = false;
          }

          log['content'] = '';

          logindex++;
        }, this);

        if (selectedlogindex !== null) {
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

              this.setState({ logs: logs, directtolog: directtolog });
            }
          );
        } else {
          Alert.error(
            'is that url correct ? log not found : "' + logtitle + '"',
            {
              position: 'bottom-right',
              effect: 'bouncyflip',
              timeout: 5000
            }
          );
        }

        this.setState({ logs: logs, directtolog: directtolog });
      }
    );
    // Intialize state
    this.state = {
      logs: [],
      directtolog: false
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
          this.setState({ logs: logs, directtolog: false });
        }
      );
    }

    logs[logIndex] = log;
    this.setState({ logs: logs, directtolog: false });
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
            <div ref={el => (this.selecteddiv = el)}>
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
            </div>
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

  componentDidUpdate() {
    if (
      this.selecteddiv !== null &&
      this.selecteddiv !== undefined &&
      this.state.directtolog
    ) {
      this.selecteddiv.scrollIntoView(true, {
        block: 'start',
        behavior: 'smooth'
      });
    }
  }
}
