import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import './logs.css';

export default class Logs extends TrackedComponent {
  render() {
    return (
      <div className="Logs">
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
