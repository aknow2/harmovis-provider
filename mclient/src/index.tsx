import React from 'react';
import ReactDOM from 'react-dom';
import { getCombinedReducer } from 'harmoware-vis';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import heatmapSettings from './reducer/heatmapSettings';
import socket from './reducer/socket';
import timelapseSettings from './reducer/timelapseSettings';
import mySaga from './sagas/subscribeSocket';
import './harmovis.scss';
import App from './App';

console.log('load saga');
const saga = createSagaMiddleware();

const store = createStore(
  getCombinedReducer({
    heatmapSettings,
    socket,
    timelapseSettings
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
