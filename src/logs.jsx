import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import GitHub from 'github-api';
import ReactMarkdown from 'react-markdown';
import './logs.css';

export default class Logs extends TrackedComponent {
  constructor(props) {
    super(props);
    var gh = new GitHub();
    // get the repo
    var repo = gh.getRepo('dparkar', 'blog-react');
    // get the folder contents
    repo.getContents('master', 'content', true, (err1, files) => {
      if (err1) {
        console.log(err1); // we can't get the data, for some reason
        return;
      }
      // go through each file in the folder
      files.forEach(function(file) {
        repo.getContents(
          'master',
          'content/' + file.name,
          true,
          (err2, content) => {
            if (err2) {
              console.log(err2); // we can't have the data, for some reason
              return;
            }
            console.log(content);
            this.setState({ logs: content });
          }
        );
      }, this);
    });
    // Update state
    this.state = {
      //repoName: repoName,
      id: 'fetching id ...',
      logs: 'fetching logs ...'
    };
  }

  render() {
    return (
      <div className="Logs">
        <ReactMarkdown source={this.state.logs} />
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
