import { SUCCESS_CODE } from '../../configs/status-codes';
import { UserService, SubscriptionPlanService } from '../../services';
import { BadRequest } from '../../errors';
import { EMAIL_EXISTS, USER_ADDED } from '../../configs/constants';
import Utils from '../../helpers/utils';
import { createCustomer, addSubscription } from '../../helpers/stripe';


export class AuthController {
    /**
     * User registration
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    static async register(req, res, next) {
        const { token,
                address,
                binType,
                comment,
                email,
                firstName,
                frequency,
                lastName,
                latitude,
                longitude,
                coupon,
                phone } = req.body;
        let user;

        

        try {
            // create stripe customer
            const customer = await createCustomer(email, token);
            const customer_id = customer.id;
            // calculate price to pay
            let planName = '';
            if (frequency === 'weekly' && binType === 'binOnly') {
                planName = 'weeklyBinOnly';
            } else if(frequency === 'weekly' && binType === 'binRollcart') {
                planName = 'weeklyBinRollcart';
            } else if (frequency === 'biWeekly' && binType === 'binOnly') {
                planName = 'biWeeklyBinOnly';
            } else if(frequency === 'biWeekly' && binType === 'binRollcart') {
                planName = 'biWeeklyBinRollcart';
            }

            const plan = await SubscriptionPlanService.fetchPlanByName(planName);

            await addSubscription(customer_id, plan.stripe_id, coupon);

            // Insert User details.
            user = await UserService.insertAndFetchUser({
                first_name: firstName,
                last_name: lastName,
                email,
                address,
                phone,
                comment,
                bin_type: binType,   
                frequency: frequency,
                location: [latitude, longitude],
                customer_id
            });

            return res.status(SUCCESS_CODE).json({
                message: USER_ADDED,
                data: user,
                errors: null
            });
        }
        catch (err) {
            next(err);
        }
    }
}
