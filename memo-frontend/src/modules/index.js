import {combineReducers} from 'redux';
import { all } from 'redux-saga/effects'
import loading from './loading' 
import auth, {authSaga} from './auth'; 
import user, {userSaga} from './user';

const rootReducer = combineReducers({ 
    loading, 
    auth,
    user
});
export function * rootSaga(){
    yield all([authSaga(), userSaga()])
}
export default rootReducer