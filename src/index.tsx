import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddlerware from "redux-promise";
import reduxThunk from "redux-thunk";
import reducer from "./Reducers";

const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;


const createStoreWidthMiddleware = applyMiddleware(
  promiseMiddlerware,
  reduxThunk
)(createStore);

ReactDOM.render(

  <Provider store={createStoreWidthMiddleware(reducer, devTools && devTools())}>
    <App />
  </Provider>,
  document.getElementById('root')
);

