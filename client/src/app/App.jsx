// @flow

import * as React from "react";
import { BrowserRouter } from 'react-router-dom'
import {Provider} from "react-redux";

import configureStore from "helpers/store/configureStore";
import {mainReducer, mainSaga} from "./services";
import Main from './services/router';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import "sass/vendor.scss";

export default () => {

    const store = configureStore(mainReducer, mainSaga);
    return (
           <Provider store={store}>
                <BrowserRouter>
                    <Main />
                </BrowserRouter>
           </Provider>
        
    );
};
