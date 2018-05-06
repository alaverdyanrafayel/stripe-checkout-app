if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}

import env from 'env-var';

export const mongoUrl = process.env.mongoUrl || env.get('MONGO_URL').asString();
export const apiURL = process.env.apiURL || env.get('API_URL').asString();
export const appURL = process.env.appURL  || env.get('APP_URL').asString();
export const port = process.env.PORT || env.get('PORT').asString();
export const stripeSecretKey = process.env.STRIPE_SECRET_KEY || env.get('STRIPE_SECRET_KEY').asString();
