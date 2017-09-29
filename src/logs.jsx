import React, { Component } from 'react';
import AnimakitElastic from 'animakit-elastic';
import './logs.css';

export default class Logs extends Component {
  render() {
    return (
      <div className="Logs">
        <AnimakitElastic>Is this working</AnimakitElastic>
      </div>
    );
  }
}
