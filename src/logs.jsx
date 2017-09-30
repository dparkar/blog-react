import React from 'react';
import { TrackedComponent } from 'react-appinsights';
import './logs.css';

export default class Logs extends TrackedComponent {
  render() {
    return (
      <div className="Logs">
        <img
          src="http://orig10.deviantart.net/046c/f/2013/084/b/a/coding_in_progress_by_phodyr-d5z942u.jpg"
          alt="coding"
          height="20%"
          width="20%"
        />
        <p>
          See code here :{' '}
          <a href="https://github.com/dparkar/blog-react">
            https://github.com/dparkar/blog-react
          </a>
        </p>
      </div>
    );
  }
}
