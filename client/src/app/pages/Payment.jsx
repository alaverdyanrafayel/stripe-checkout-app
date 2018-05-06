// @flow

import React from 'react';
import { Elements } from 'react-stripe-elements';
import { StripeCheckoutForm } from 'components';
import { Container, Col, Row, InputGroup, Input, Button } from 'reactstrap';
import { cloneDeep, isEqual } from 'lodash';
import amex from '../../../assets/images/credit_cards_amex.png';
import mastercard from '../../../assets/images/credit_cards_mastercard.png';
import visa from '../../../assets/images/credit_cards_visa.png';



import { toast, ToastContainer } from 'react-toastify';
import { DASHBOARD, SUCCESS } from '../../configs/constants';
import { withRouter } from 'react-router'


export class Payment extends React.Component {
    constructor(props) {
        super(props);
        props.setBackButtonText('Back to Shopping Info');
    }

    redirectToDashboard() {
        this.props.history.push(DASHBOARD);
    }

    componentWillReceiveProps(nextProps){
        
        const { userMessage } = nextProps;
        if(userMessage === SUCCESS){
            this.redirectToDashboard();
        } else if(userMessage){
            toast.error(userMessage);
        }
    }

    render() {

        const { attemptSignUp, userFields } = this.props;

        return (
            <Container className="app-payment-container">
            <ToastContainer />
            <Col xs="12" className="stripe-payment">
                            <Row>
                    <Col xs="11" className="credit-card-header">
                        <Row className="credit-card-header-row">
                            Payment
                        </Row>
                        <div className="credit-card">
                        <p> Credit Card</p>
                        <div className="credit-card-images">
                            <img src={mastercard}/>
                            <img src={visa}/>
                            <img src={amex}/>
                        </div>
                        </div>
                        <p className="credit-card-text">
                                Safe money transfer using your bank account. 
                                Visa, Maestro, Discover, American Express
                        </p>
                    </Col>
                </Row>
                <Col xs="12" className="stripe-payment-form">
                    <Elements>
                         <StripeCheckoutForm userFields={userFields} attemptSignUp={attemptSignUp} />
                    </Elements>
                </Col>
            </Col>
            </Container>
        );
    }
}

export default withRouter(Payment);