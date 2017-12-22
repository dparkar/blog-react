import React from 'react';
import { Link } from 'react-router-dom';
import { TrackedComponent } from 'react-appinsights';
import GitHub from 'github-api';
import { Wave } from 'better-react-spinkit';
import MetaTags from 'react-meta-tags';
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
        this.setState({ logs: logs, tagged: this.props.tag, fetched: true });
      }
    );
    // Intialize state
    this.state = {
      logs: [],
      tagged: undefined,
      fetched: false
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({ tagged: nextProps.tag });
    var logsdiv = document.getElementById('logs');
    logsdiv.scrollIntoView();
  }

  render() {
    let filteredlogs = this.state.logs;
    let logs;
    if (this.state.logs.length === 0 && this.state.fetched === false) {
      logs = (
        <div className="waiter">
          <Wave size={100} color="white" />
        </div>
      );
    } else if (this.state.logs.length === 0 && this.state.fetched === true) {
      logs = <div className="note">no logs found</div>;
    } else {
      // filtering if tag is supplied
      if (this.state.tagged !== undefined) {
        var tag = decodeURIComponent(this.state.tagged);
        filteredlogs = this.state.logs.filter(
          log => log.tags.indexOf(tag) !== -1
        );
      }
      logs = filteredlogs.map(log => {
        var tagbuttons = log.tags.map(tag => {
          var taglink = '/tagged/' + encodeURIComponent(tag);
          return (
            <Link className="tag" id={tag} to={taglink}>
              {tag}
            </Link>
          );
        });
        return (
          <div className="metadatawithtags">
            <Link id={log.title} to={'/log/' + encodeURIComponent(log.title)}>
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
            <div className="tags">
              {tagbuttons}
            </div>
          </div>
        );
      });
    }
    return (
      <div id="logs" className="logs">
        <MetaTags>
          <title>logs | dhawal parkar</title>
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="dplogs" />
          <meta property="og:title" content="logs | dhawal parkar" />
          <meta property="og:url" content="http://dplogs.com" />
          <meta
            property="og:image"
            content="https://dplogscontent.blob.core.windows.net/dplogs/metaimage_250_250.png"
          />
          <meta property="og:image:alt" content="dplogs" />
          <meta property="og:image:width" content="250" />
          <meta property="og:image:height" content="250" />
          <meta
            property="og:description"
            content="Artificial Intelligence and Robotics"
          />
          <meta property="fb:app_id" content="367989410291145" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="@dparkar" />
        </MetaTags>
        {logs}
      </div>
    );
  }
}
