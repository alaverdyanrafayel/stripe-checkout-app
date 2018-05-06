// @flow

import { actions } from './AuthUserReducer';

export function attemptSignUp(data: Object) {
    return { type: actions.ATTEMPT_SIGN_UP, payload: { data } };
}

export function attemptSignUpSucceed(data: Object) {
    return { type: actions.ATTEMPT_SIGN_UP_SUCCEED, payload: { data } };
}

export function attemptSignUpFailed(data: Object) {
    return { type: actions.ATTEMPT_SIGN_UP_FAILED, payload: { data } };
}

export function attemptSaveSignUpFields(data: Object) {
    return { type: actions.ATTEMPT_SAVE_SIGN_UP_FIELDS, payload: { data } };
}
