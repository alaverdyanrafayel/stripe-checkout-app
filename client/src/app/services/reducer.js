// @flow

import {combineReducers} from "redux-immutable";
import {Map} from "immutable";
import userData from '../modules/auth-user/AuthUserReducer';

export default combineReducers({
    userData
});
