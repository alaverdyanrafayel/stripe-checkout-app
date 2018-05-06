import {
    REQUIRED,
    INVALID,
    BEARER_AUTH
} from '../../configs/messages';

export default {
    checkEmail: {
        validation: {
            'email': {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Email')
                },
                isEmail: {
                    errorMessage: INVALID('Email')
                }
            }
        }
    },
    addCard: {
        authentication: BEARER_AUTH,
        validation: {
            'tokenId': {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Payment token')
                }
            }
        }
    },
    register: {
        validation: {
            'firstName': {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('First name')
                }
            },
            'lastName': {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Last name')
                }
            },
            'address': {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Address')
                }
            },
            'phone': {
                in: 'body',
                notEmpty: {
                    errorMessage: REQUIRED('Phone')
                }
            },                            
        }
    },
};
