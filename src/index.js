import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from '@reach/router';
import store from "./_redux/store";
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import App from './App';

const wrappedApp = (
  <Provider store={store}>
    <Router>
      <App path="/" />
    </Router>
  </Provider>
);

ReactDOM.render(
  wrappedApp,
  document.getElementById('root')
);

registerServiceWorker();
