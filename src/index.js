import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import ReactAI from 'react-appinsights';
import { HashRouter } from 'react-router-dom';

ReactAI.init({ instrumentationKey: '507bb888-d420-42ad-91b8-2f43b6fc3af4' });

ReactDOM.render(
  <HashRouter onUpdate={ReactAI.trackRouterChange}>
    <App />
  </HashRouter>,
  document.getElementById('root')
);

registerServiceWorker();
