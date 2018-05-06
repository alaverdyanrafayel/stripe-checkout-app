import { AuthController } from './auth.controller.js';
import middlewares from '../../middlewares';
import schemas from './schemas';

export default (router) => {
    const {
        register
    } = AuthController;

    router.post('/register', ...middlewares(schemas, 'register'), register);
    
};
