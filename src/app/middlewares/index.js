import validator from './validator';
import { BEARER_AUTH } from '../configs/constants';

export default (schemas, actionName) => {
    let middlewares = [];

    if (!schemas[actionName]) {
        return middlewares;
    }

    if (schemas[actionName].authentication === BEARER_AUTH) {
        middlewares.push(passport);
    }

    if (schemas[actionName].validation) {
        middlewares.push(validator(schemas[actionName].validation));
    }

    return middlewares;
};
