import React, { Component } from 'react';
import { Chronology } from 'react-chronos';
// import { Timeline, Bookmark, Marker } from 'react-vertical-timeline';
import './logs.css';

export default class Logs extends Component {
  constructor() {
    super();
    this.state = { progress: 50 };
    /*var that = this;
    setInterval(function () {
      that.increment();
    }, 1000);*/
  }

  /*  increment() {
    var progress = this.state.progress > 100 ? 0 : (this.state.progress + 1);
    this.setState({progress: progress});
  }

  progressClick(progress) {
    this.setState({progress: progress});
  } */

  render() {
    return (
      <div className="Logs">
        <Chronology
          type="vertical"
          timelineStyle={{ width: '2px', backgroundColor: '#aaa' }}
        >
          <div>
            <div className="marker" />
            <div className="event event-vertical" style={{ height: `100px` }}>
              Hi there !
            </div>
            <div className="marker" />
            <div className="event event-vertical" style={{ height: `100px` }}>
              Hi there !
            </div>
            <div className="marker" />
            <div className="event event-vertical" style={{ height: `100px` }}>
              Hi there !
            </div>
            <div className="marker" />
            <div className="event event-vertical" style={{ height: `100px` }}>
              Hi there !
            </div>
          </div>
        </Chronology>
        test test test
      </div>
    );
  }
}
