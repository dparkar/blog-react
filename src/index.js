import React from 'react';
import ReactDOM from 'react-dom';
import ReactAI from 'react-appinsights';
import App from './App/app';
import { BrowserRouter } from 'react-router-dom';
import WebFont from 'webfontloader';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactAI.init({ instrumentationKey: '507bb888-d420-42ad-91b8-2f43b6fc3af4' });

WebFont.load({
  google: {
    families: ['Titillium Web:300,400,700', 'sans-serif']
  }
});

ReactDOM.render(
  <BrowserRouter onUpdate={ReactAI.trackRouterChange}>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
