// @flow

import { fromJS, Map } from 'immutable';

export const actions = {
    ATTEMPT_SIGN_UP: 'ATTEMPT_SIGN_UP',
    ATTEMPT_SIGN_UP_SUCCEED: 'ATTEMPT_SIGN_UP_SUCCEED',
    ATTEMPT_SIGN_UP_FAILED: 'ATTEMPT_SIGN_UP_FAILED',
    ATTEMPT_SAVE_SIGN_UP_FIELDS: 'ATTEMPT_SAVE_SIGN_UP_FIELDS'
};

const defaultState = fromJS({
    message: '',
    fields: {
        firstName: '',
        lastName: '',
        address: '',
        latitude: null,
        longitude: null,
        email: '',
        phone: '',
        binType: 'binRollcart',
        frequency: 'biWeekly',
        comment: '',
        hasCoupon: '',
        coupon: ''
    }
});

export default (
    state: any = defaultState,
    { type, payload }: { type: string, payload: any }
) => {
    switch (type) {
            case actions.ATTEMPT_SAVE_SIGN_UP_FIELDS:
                return state.update('fields', prevFields => {
                    return fromJS({
                        ...prevFields.toJS(),
                        ...payload.data.fields
                    });
                });
            case actions.ATTEMPT_SIGN_UP_SUCCEED:
                return state
                        .set('loggedInUser', fromJS(payload.data.data))
                        .set('message', payload.data.message);

            case actions.ATTEMPT_SIGN_UP_FAILED:
                return state.set('message', payload.data);
            default:
                return state;
    }
};
