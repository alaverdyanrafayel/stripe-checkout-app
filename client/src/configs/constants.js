// @flow

import params from 'configs/params';

export const REQUIRED = (resource: string): string => `${resource} is required!`;

export const INVALID_EMAIL = (resource: string): string => `${resource} is invalid!`;

export const NUMBER_LETTER = (resource: string): string => `${resource} requires at least one number and letter!`;


export const PASSWORD_MIN_LENGTH = 8;

export const LENGTH_REQUIRED =
(resource: string, options: { min?: number, max?: number}) => {
    const { min, max } = options;
    if (min && max) {
        return `${resource} must be at least ${min} and maximum ${max} characters!`;
    } else if (min) {
        return `${resource} must be at least ${min} characters!`;
    } else if (max) {
        return `${resource} must be maximum ${max} characters!`;
    }
};

export const ACCESS_TOKEN = 'token';

export const DASHBOARD = '/dashboard';

export const SUCCESS = "User successfully registered.";
