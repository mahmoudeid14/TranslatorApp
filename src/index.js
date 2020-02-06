import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { saveState } from './store/localStorage';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import _ from 'lodash';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

store.subscribe(_.throttle(() => {
    saveState({
        currentUser: store.getState().currentUser
    });
}, 1000));
serviceWorker.unregister();
