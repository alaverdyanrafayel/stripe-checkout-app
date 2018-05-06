import moment from 'moment';
import params from '../configs/params';
import * as jwt from 'jsonwebtoken';

export default class Utils {
    static signJWTToken(user) {
        const payload = { id: user.id, created_at: moment().toString() };

        // Generate short live access token
        const token = jwt.sign(payload, params.tokenSecret, { expiresIn: 15 * 60 }); // 15 minutes

        // Generate refresh token and set in httpOnly cookie
        const refreshToken = jwt.sign({ ...payload }, params.tokenSecret, { expiresIn: 24 * 60 * 60 }); // an hour

        return { token, refreshToken };
    }
}
