import User from './user';
import SubscriptionPlan from './subscriptionPlan';

export default function initModels(mongoose) {
    User(mongoose);
    SubscriptionPlan(mongoose);
}

