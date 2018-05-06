import {
    apiURL,
    appURL,
    port,
    tokenSecret,
    stripeSecretKey
} from '../helpers/config';

const params = {
    development: {
        apiUrl: apiURL,
        appUrl: appURL,
        apiPort: port,
        tokenSecret: tokenSecret,
        stripeSecretKey
    },
    production: {
        apiUrl: apiURL,
        appUrl: appURL,
        apiPort: port,
        tokenSecret: tokenSecret,
        stripeSecretKey
    }
};

export default params[process.env.NODE_ENV || 'development'];
