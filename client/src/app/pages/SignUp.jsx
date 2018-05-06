// @flow

import React from 'react';
import { cloneDeep, isEqual } from 'lodash';
import { Container, Col, Row, InputGroup, Input, Button } from 'reactstrap';
import { isEmail, isEmpty } from 'validator';
import { Link } from 'react-router-dom';
import { AddressAutocomplete } from 'components';

import { INVALID_EMAIL, REQUIRED } from 'configs/constants';

const signUpState = {
    fields: {
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        phone: '',
        latitude: null,
        longitude: null
    },
    errors: {
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        phone: ''
    }
};

type Props = {
    attemptSignUp: ({ fields: Object, errors: Object }) => {},
    setNextButtonText: (val: string) => {},
    attemptSaveSignupFields: (val: Object) => {},
    userFields: any
};

type State = {
    fields: {
        firstName: string,
        lastName: string,
        address: string,
        email: string,
        phone: number,
        latitude: number,
        longitude: number
    },
    errors: {
        firstName?: string,
        lastName?: string,
        address?: string,
        email?: string,
        phone?: number
    }
};

export class SignUp extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const userFields = props.userFields.toJS();
        Object.keys(signUpState.fields).forEach(key => {
            signUpState.fields[key] = userFields[key];
        });
        this.state = cloneDeep(signUpState);
        props.setNextButtonText('SELECT PLAN');
    }

    validate(name: string, value: any) {
        switch (name) {
                case 'firstName':
                    if (isEmpty(value)) {
                        return REQUIRED('First Name');
                    } else {
                        return '';
                    }
                case 'lastName':
                    if (isEmpty(value)) {
                        return REQUIRED('Last Name');
                    } else {
                        return '';
                    }
                case 'address':
                    if (isEmpty(value)) {
                        return REQUIRED('Address');
                    } else if (
                    !this.state.fields.latitude ||
                    !this.state.fields.longitude ||
                    this.state.errors.address
                ) {
                        return 'Address is not valid';
                    } else {
                        return '';
                    }
                case 'email':
                    if (isEmpty(value)) {
                        return REQUIRED('Email');
                    } else if (!isEmail(value)) {
                        return INVALID_EMAIL('Email');
                    }

                    return '';

                case 'phone':
                    if (isEmpty(value)) {
                        return REQUIRED('Phone');
                    } else {
                        return '';
                    }
        }
    }

    handleChange = ({
        target: { value, name }
    }: {
        target: { value: string, name: string }
    }) => {
        const newState = cloneDeep(this.state);

        if (name !== 'address') {
            newState.errors[name] = this.validate(name, value);
        }
        newState.fields[name] = value;

        if (!isEqual(this.state, newState)) {
            this.setState(newState);
        }
    };
    handleCoordinatesChange = ({ lat, lng }: { lat: number, lng: number }) => {
        const newState = cloneDeep(this.state);
        newState.fields.latitude = lat;
        newState.fields.longitude = lng;
        newState.errors.address = '';
        this.setState(newState);
        this.props.attemptSaveSignUpFields({ fields: newState.fields });
    };

    handleAddressChange = (address: string) => {
        this.handleChange({ target: { value: address, name: 'address' } });
    };

    handleAddressError = (errorMessage: string) => {
        const newState = cloneDeep(this.state);
        newState.errors.address = errorMessage;
        this.setState(newState);
    };

    isValidated = () => {
        const fields = cloneDeep(this.state.fields);
        let validationErrors = {};
        Object.keys(fields).map(name => {
            const error = this.validate(name, fields[name]);
            if (error && error.length > 0) {
                validationErrors[name] = error;
            }
        });
        if (Object.keys(validationErrors).length > 0) {
            this.setState({ errors: validationErrors });

            return false;
        }

        this.props.attemptSaveSignUpFields({ fields });

        return true;
    };

    render() {
        console.log(this.props.userFields.toJS());
        const {
            handleCoordinatesChange,
            handleAddressChange,
            handleAddressError
        } = this;

        return (
            <div>
                <Container className="sign-up">
                    <Col xs="12">
                        <h3 className="checkout-header">
                            Personal Information
                        </h3>
                        <form method="post">
                            <Row>
                                <Col xs="12" sm="6">
                                    <p className="app-label">FIRST NAME</p>
                                    <InputGroup>
                                        <Input
                                            name="firstName"
                                            value={this.state.fields.firstName}
                                            onChange={this.handleChange}
                                        />
                                    </InputGroup>
                                    <p className="error app-error">
                                        {this.state.errors.firstName}
                                    </p>
                                </Col>
                                <Col xs="12" sm="6">
                                    <p className="app-label">LAST NAME</p>
                                    <InputGroup>
                                        <Input
                                            name="lastName"
                                            value={this.state.fields.lastName}
                                            onChange={this.handleChange}
                                        />
                                    </InputGroup>
                                    <p className="error app-error">
                                        {this.state.errors.lastName}
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12">
                                    <p className="app-label">ADDRESS</p>
                                    <AddressAutocomplete
                                        value={this.state.fields.address}
                                        handleAddressError={handleAddressError}
                                        handleAddressChange={
                                            handleAddressChange
                                        }
                                        handleCoordinatesChange={
                                            handleCoordinatesChange
                                        }
                                    />
                                    <p className="error app-error">
                                        {this.state.errors.address}
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs="12" sm="6">
                                    <p className="app-label">EMAIL</p>
                                    <InputGroup>
                                        <Input
                                            name="email"
                                            value={this.state.fields.email}
                                            onChange={this.handleChange}
                                        />
                                    </InputGroup>
                                    <p className="error app-error">
                                        {this.state.errors.email}
                                    </p>
                                </Col>
                                <Col xs="12" sm="6">
                                    <p className="app-label">PHONE</p>
                                    <InputGroup>
                                        <Input
                                            name="phone"
                                            type="tel"
                                            value={this.state.fields.phone}
                                            onChange={this.handleChange}
                                        />
                                    </InputGroup>
                                    <p className="error app-error">
                                        {this.state.errors.phone}
                                    </p>
                                </Col>
                            </Row>
                        </form>
                    </Col>
                </Container>
                <Link to="/" className="back-to-home">
                    <i className="fa fa-arrow-left" /> Return to Home
                </Link>
            </div>
        );
    }
}

export default SignUp;
