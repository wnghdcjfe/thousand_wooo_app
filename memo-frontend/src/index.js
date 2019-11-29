import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleWare from 'redux-saga';
import rootReducer, {rootSaga} from './modules';
import {tempSetUser, check} from './modules/user'

const sagaMiddleware = createSagaMiddleWare()
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

const loadUser = () => {
    try{
        const user = localStorage.getItem('user')
        if(!user) return; 
        store.dispatch(tempSetUser(user));
        store.dispatch(check());
    }catch(e){ 
        console.log('로컬 스토리지 문제')
    }
}

sagaMiddleware.run(rootSaga)
loadUser();
ReactDOM.render(<Provider store = {store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
