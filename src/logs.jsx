import React, { Component } from 'react';
import { Chronology } from 'react-chronos';
import './logs.css';

export default class Logs extends Component {
  render() {
    var event1 = { key: 1, details: 'this is the first event' };
    var event2 = { key: 2, details: 'this is the second event' };
    var event3 = { key: 3, details: 'this is the third event' };
    var event4 = { key: 4, details: 'this is the fourth event' };
    var events = [event1, event2, event3, event4];

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
