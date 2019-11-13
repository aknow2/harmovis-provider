import React from 'react';
import ReactDOM from 'react-dom';
import { getCombinedReducer } from 'harmoware-vis';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import heatmapSettings from './reducer/heatmapSettings';
import mySaga from './sagas/subscribeSocket';
import './harmovis.scss';
import App from './App';

const saga = createSagaMiddleware();

const store = createStore(
  getCombinedReducer({
    heatmapSettings
  }),
  applyMiddleware(saga)
);
saga.run(mySaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
