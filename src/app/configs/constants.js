export const VALIDATION_ERROR = `Request didn't pass validation`;
export const PERMISSION_DENIED = 'Permission Denied';
export const SOMETHING_WENT_WRONG = 'Something went wrong, please try again';
export const REQUIRED = resource => `${resource} is required`;
export const INVALID = resource => `${resource} is invalid`;
export const INVALID_PASSWORD = 'Password must contain at least one character and one number';
export const BEARER_AUTH = 'bearer';
export const MIN_LENGTH = 1;
export const EMAIL_MAX_LENGTH = 64;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 64;
export const EMAIL_EXISTS = resource => `Account with the email ${resource} already exists`;
export const USER_ADDED = 'User successfully registered.';
export const USER_NOT_EXIST = 'The email or password you entered is incorrect. Please try again';

export const LARGE_IMAGE_SIZE = "The file is too big";

export const LONG_MESSAGE = "Message must not exceed 200 characters!";

export const LENGTH_REQUIRED = (resource, options) => {
    const { min, max } = options;
    if (min && max) {
        return `${resource} must be at least ${min} and maximum ${max} characters`;
    } else if (min) {
        return `${resource} must be at least ${min} characters!`;
    } else {
        return `${resource} must be maximum ${max} characters!`;
    }
};


