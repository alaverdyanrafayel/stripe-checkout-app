export default (mongoose) => {
    let SubscriptionPlanSchema = mongoose.Schema({
        name: String,
        stripe_id: String
    });

    return mongoose.model('SubscriptionPlan', SubscriptionPlanSchema, 'subscriptionPlans');
};

