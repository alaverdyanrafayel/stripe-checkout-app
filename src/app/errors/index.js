import {
    UNAUTHORIZED_CODE,
    BAD_REQUEST_CODE,
    GONE_CODE,
    FORBIDDEN_CODE,
    VALIDATION_ERROR_CODE,
    CONFLICT_CODE,
    NOT_FOUND_CODE
} from '../configs/status-codes';
import {
    PERMISSION_DENIED,
    SOMETHING_WENT_WRONG,
    VALIDATION_ERROR
} from '../configs/constants';

export class AuthError extends Error {
    status = UNAUTHORIZED_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class BadRequest extends Error {
    status = BAD_REQUEST_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class Conflict extends Error {
    status = CONFLICT_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class NotFound extends Error {
    status = NOT_FOUND_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class Forbidden extends Error {
    status = FORBIDDEN_CODE;
    message = PERMISSION_DENIED;
    errors;

    constructor (errors = null) {
        super();
        this.errors = errors;
    }
}

export class Gone extends Error {
    status = GONE_CODE;
    message;
    errors;

    constructor(message, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class ValidationError extends Error {
    status = VALIDATION_ERROR_CODE;
    message = VALIDATION_ERROR;
    errors;

    constructor(errors) {
        super();
        this.errors = errors;
    }
}

export class ServiceUnavailable extends Error {
    status = BAD_REQUEST_CODE;
    message = SOMETHING_WENT_WRONG;
    errors;

    constructor(message, errors = null) {
        super();

        if (errors) {
            this.message = message;
            this.errors = errors;
        } else {
            if (typeof message === 'string') {
                this.message = message;
            } else {
                this.errors = message;
            }
        }
    }
}
