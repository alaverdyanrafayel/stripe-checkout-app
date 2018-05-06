// @flow

import { Saga } from "redux-saga";
import { call, put, takeLatest } from 'redux-saga/effects';
import * as Actions from './AuthUserActions';
import { actions } from './AuthUserReducer';
import * as Api from 'api/AuthUserApi';

function* attemptSignUp({ payload: { data} }: { payload: { data: Object}}): Saga<void>  {
    try{    
        // yield put(Actions.clear()); 
        const response = yield call(Api.attemptSignUp, data);
        yield put(Actions.attemptSignUpSucceed(response.data));
     } catch ({ response: { data: { message } } }) {
        yield put(Actions.attemptSignUpFailed(message))
    }
}

function* authUserSaga(): Saga<void> {
   yield takeLatest(actions.ATTEMPT_SIGN_UP, attemptSignUp);
}

export default authUserSaga;
