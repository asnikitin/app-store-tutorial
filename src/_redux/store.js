import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import rootReducer from './actions';

const enhancers = [];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

function configureStore(initialState = {}) {
  const middleware = [];

  if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger());
  }

  const createStoreWithMiddleware = compose(
    applyMiddleware(...middleware),
    ...enhancers
  )(createStore);

  const store = createStoreWithMiddleware(rootReducer, initialState);

  return store;
}

export default configureStore();
