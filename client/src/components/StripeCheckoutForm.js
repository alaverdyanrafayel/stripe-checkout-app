import React from 'react';
import {
    injectStripe,
    CardNumberElement,
    CardExpiryElement,
    CardCVCElement
} from 'react-stripe-elements';
import { Row, Col, Input, InputGroup, Button } from 'reactstrap';
import { cloneDeep, isEqual } from "lodash";

const cardBrandToClass = {
    visa: 'fa-cc-visa',
    mastercard: 'fa-cc-mastercard',
    amex: 'fa-cc-amex',
    discover: 'fa-cc-discover',
    unknown: 'fa-credit-card'
};

class StripeCheckoutForm extends React.Component {
    state = {
        loading: false,
        brand: 'unknown',
        errors: {
            cardNumber: "",
            cardExpiry: "",
            cardCvc: ""
        }
    };

    handleSubmit = () => {
         const { errors } = this.state;
         if (Object.values(errors).join("").length === 0) {
            // Within the context of `Elements`, this call to createToken knows which Element to
            // tokenize, since there's only one in this group.
            this.setState({...this.state, loading: true})
            this.props.stripe
            .createToken()
            .then(({ token }) => {
                if(token && token.id) {
                    const { userFields } = this.props;
                    this.props.attemptSignUp({token: token.id, ...userFields.toJS()})
                }
            })
            .catch((e) => {
                console.log(e)
                this.setState({...this.state, loading: false})
            });
            }
    };


    handleChange = ({ brand, empty, error, elementType }) => {
       console.log(brand, empty, error, elementType)
        const newState = cloneDeep(this.state);
        newState.brand = brand;
        if(empty) {
            newState.errors[elementType] = "Field is required";
        } else if(error && error.message) {
            newState.errors[elementType] = error.message;
        } else {
            newState.errors[elementType] = ""
        }
        if (!isEqual(this.state, newState)) {
            this.setState(newState);
        }
    };

    render() {
        return (
            <React.Fragment>
                <div className="stripe-form">
                <Row>
                    <Col xs="12" sm="12">
                        <p className="app-label"> Card Number </p>
                        <i
                            className={`fa ${
                                cardBrandToClass[this.state.brand]
                            } app-credit-card-icon`}
                            aria-hidden="true"
                        />
                        <CardNumberElement
                            placeholder="0000 0000 0000 0000"
                            onChange={this.handleChange}
                        />
                         <p className="error app-error">
                                        {this.state.errors.cardNumber}
                                    </p>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="6">
                        <p className="app-label"> NAME ON CARD </p>
                        <InputGroup>
                            <Input name="name" />
                        </InputGroup>
                    </Col>
                    <Col xs="12" sm="3" className="exp-date">
                        <p className="app-label"> EXPIRY DATE </p>
                        <CardExpiryElement
                           onChange={this.handleChange}
                        />
                         <p className="error app-error">
                                        {this.state.errors.cardExpiry}
                                    </p>
                    </Col>
                    <Col xs="12" sm="3">
                        <p className="app-label"> CVC CODE</p>
                        <CardCVCElement
                            onChange={this.handleChange}
                        />
                         <p className="error app-error">
                                        {this.state.errors.cardCvc}
                                    </p>
                    </Col>        
                </Row>
               </div>
                <Button className="complete-trial" 
                        onClick={this.handleSubmit} 
                        disabled={this.state.loading}>COMPLETE TRIAL</Button>
            </React.Fragment>
        );
    }
}

export default injectStripe(StripeCheckoutForm);
