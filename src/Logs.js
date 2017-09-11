import React, { Component } from 'react';
import Chronology from 'react-chronos';
import './Logs.css';

export default class Logs extends Component {
  render() {
    const events = { a: { details: 'first' }, b: { details: 'second' } };
    return (
      <div className="Logs">
        <Chronology type="vertical">
          {events.map(event =>
            <div>
              <div class="marker" />
              <div class="event">
                {event.details}
              </div>
            </div>
          )}
        </Chronology>
      </div>
    );
  }
}
