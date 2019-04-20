import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Life from './pages/demo/Life'
// import Admin from './admin'
import Router from './router'
import { Provider } from 'react-redux'
import configureStore from './redux/store/configureStore'
import * as serviceWorker from './serviceWorker';
//configureStore保存存数据源的地方 Provider提供数据源的地方
const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
