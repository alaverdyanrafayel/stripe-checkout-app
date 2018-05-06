import { ServiceUnavailable, ValidationError } from '../errors';

export default (schema = null) => {

    return async (req, res, next) => {
        if (schema) {
            req.check(schema);
        }

        let result;
        try {
            result = await req.getValidationResult();	
        } catch (error) {
            return next(new ServiceUnavailable(error.message));
        }

        if (result && !result.isEmpty()) {
            return next(new ValidationError(result.mapped()));
        }

        next();
    };
};
