import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import GitHub from 'github-api';
import './logs.css';

export default class Logs extends TrackedComponent {
  constructor(props) {
    super(props);
    var gh = new GitHub();
    var repoName = gh._getFullName('dparkar', 'blog-react');
    var repo = gh.getRepo('dparkar', 'blog-react');
    repo.getDetails((err, data) => {
      if (err) {
        console.log(err); // we can't have the data, for some reason
        return;
      }
      console.log(data);
      this.setState({ id: data.id });
    });
    // Update state
    this.state = {
      repoName: repoName,
      id: 'fetching id ...'
    };
  }

  render() {
    return (
      <div className="Logs">
        {/*get all markdowns from github folder*/}
        {/*foreach markdown use component to display*/}
        <p>
          {'_getFullName : ' + this.state.repoName}
        </p>
        <p>
          {'repo.details.id : ' + this.state.id}
        </p>
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
