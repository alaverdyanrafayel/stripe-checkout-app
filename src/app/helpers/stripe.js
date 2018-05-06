const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const payWithCustomerId = (customerId, amount) => {
    return new Promise((resolve, reject) => {
        stripe.charges.create(
            {
                amount: amount * 100,
                currency: 'usd',
                customer: customerId
            },
        (err, charge) => {
            if (err) {reject(err);}
            if (charge) {resolve(charge);}
        }
      );
    });
};
export const createCustomer = (email, token) => {
    return new Promise((resolve, reject) => {
        stripe.customers.create(
            {
                description: `Customer for ${email}`,
                source: token // obtained with Stripe.js
            },
        (err, customer) => {
            if (err) {reject(err);}
            if (customer) {resolve(customer);}
        }
      );
    });
};

export const addSubscription = (customerId, planId, coupon) => {


    return new Promise((resolve, reject) => {
        stripe.subscriptions.create(
            {
                customer: customerId,
                items: [
                    {
                        plan: planId
                    }
                ],
                coupon,
            },
        function(err, subscription) {
            if (err) {reject(err);}
            if (subscription) {resolve(subscription);}
        }
      );
    });
};
