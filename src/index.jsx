import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/app';
import WhackAMoleGame from './store/reducers';
import { setGameState, GameStates } from './store/actions';

import './styles.css';

const store = createStore(WhackAMoleGame);
store.dispatch(setGameState(GameStates.RUNNING));

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
