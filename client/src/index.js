// @flow

import {render} from "react-dom";
import React from "react"
import {StripeProvider} from 'react-stripe-elements';
import App from "./app/App";
import params from 'configs/params';

const appElement = document.getElementById("app");
if(appElement){
    render(
        (
            <StripeProvider apiKey={params.stripePublicKey}>
                {App()}
            </StripeProvider>
        ),
        appElement
    );
}
