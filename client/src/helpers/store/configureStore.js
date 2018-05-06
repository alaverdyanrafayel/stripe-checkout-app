// @flow

import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { Store } from 'react-redux';
import { fromJS } from 'immutable';
import { throttle } from 'lodash';
import { composeWithDevTools } from 'redux-devtools-extension';

export default (rootReducer: any, rootSaga: any) => {
    let store;

    const initialState = fromJS({});

    const sagaMiddleware = createSagaMiddleware();
    if (process.env.NODE_ENV === 'production') {
        store = createStore(
            rootReducer,
            initialState,
            applyMiddleware(sagaMiddleware)
        );
    } else {
        store = createStore(
            rootReducer,
            initialState,
            composeWithDevTools(applyMiddleware(sagaMiddleware))
        );
    }

    sagaMiddleware.run(rootSaga);

    return store;
};
