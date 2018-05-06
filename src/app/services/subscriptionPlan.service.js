import mongoose from 'mongoose';
const SubscriptionPlan = mongoose.model('SubscriptionPlan');

export class SubscriptionPlanService {

    constructor () {}

    static async fetchPlanByName(name) {
        return SubscriptionPlan.findOne({ name });
    }
}

