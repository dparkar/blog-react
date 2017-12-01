import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import GitHub from 'github-api';
import ReactMarkdown from 'react-markdown';
import { Collapse } from 'react-collapse';
import { presets } from 'react-motion';
import Alert from 'react-s-alert';
import { WithContext as ReactTags } from 'react-tag-input';
import ReactDisqusThread from 'react-disqus-thread';
import Share from '../Share/share.jsx';

import './logs.css';
import './s-alert-flip.css';

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
          Alert.error('invalid log title in url : "' + logtitle + '"', {
            position: 'bottom-right',
            effect: 'bouncyflip',
            timeout: 5000
          });
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
        //let shareURL = 'http://dplogs.com/log/' + log.title;
        let logMetadata = (
          <div
            className="logmetadata"
            data-id={log.datetime}
            onClick={this.handleClick}
          >
            <div className="logtitle">
              {log.title}
            </div>
            <div className="logdatetime">
              {log.datetime}
            </div>
            <div className="clearboth" />
          </div>
        );
        let logtagsandshare = (
          <div className="logtagsandsocial">
            <div className="logtags">
              <ReactTags tags={log.tags} readOnly={true} />
            </div>
            <div className="logsocial">
              <Share shareURL={'http://dplogs.com/log/' + log.title} />
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
                springConfig={presets.wobbly}
              >
                {logMetadata}
                <div className="logorsocial">
                  <ReactMarkdown source={log.content} />
                </div>
                {logtagsandshare}
                <div className="logorsocial">
                  <ReactDisqusThread
                    shortame={log.title}
                    identifier={log.datetime}
                    title={log.title}
                    url={'http://dplogs.com/log/' + log.title}
                  />
                </div>
              </Collapse>
            </div>
          );
        } else {
          return (
            <Collapse
              key={log.datetime}
              isOpened={true}
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
