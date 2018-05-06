// @flow

import {createSelector} from "reselect";
import {Map} from "immutable";

const userDataSelector = (state) => state.get('userData');

const messageSelector = createSelector(
    userDataSelector, (userData) => userData.get('message')
);

const fieldsSelector = createSelector(
    userDataSelector, (userData) => userData.get('fields')
);

const errorsSelector = createSelector(
    userDataSelector, (userData) => userData.get('errors')
);

export default (state: Object) => {
    return {
        userMessage: messageSelector(state),
        userFields: fieldsSelector(state),
        userErrors: errorsSelector(state),
    };
};
