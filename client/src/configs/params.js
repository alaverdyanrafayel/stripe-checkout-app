// @flow

import {
    host,
    apiUrl,
    stripePublicKey
} from 'helpers/config';
const urls = {
    development: {
        hostname: host,
        httpsEnabled: false,
        apiUrl,
        stripePublicKey
    },
    production: {
        hostname: host,
        httpsEnabled: true,
        env: 'production',
        apiUrl,
        stripePublicKey
    }
};

export default urls[process.env.NODE_ENV || 'development'];
