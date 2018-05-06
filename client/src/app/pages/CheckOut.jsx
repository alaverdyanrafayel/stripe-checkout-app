import React from 'react';
import StepZilla from 'react-stepzilla';
import { connect } from 'react-redux';
import { SignUp, Location, Frequency, Payment } from './index';
import { ComposedPlan } from './index';
import { NextButtonText, BackButtonText } from 'components';
import {
    attemptSaveSignUpFields,
    attemptSignUp
} from '../modules/auth-user/AuthUserActions';
import { selector } from '../services';
import { withRouter } from 'react-router';

class CheckOut extends React.Component {
    setNextButtonText = value => {
        if (this.nextButtonText) {
            this.nextButtonText.setState({ text: value });
        }
    };
    setBackButtonText = value => {
        if (this.backButtonText) {
            this.backButtonText.setState({ text: value });
        }
    };

    render() {
        const {
            userFields,
            userMessage,
            attemptSaveSignUpFields,
            attemptSignUp
        } = this.props;
        const steps = [
            {
                name: 'Personal',
                component: (
                    <SignUp
                        setNextButtonText={this.setNextButtonText}
                        setBackButtonText={this.setBackButtonText}
                        userFields={userFields}
                        attemptSaveSignUpFields={attemptSaveSignUpFields}
                    />
                )
            },
            {
                name: 'Location',
                component: (
                    <Location
                        setNextButtonText={this.setNextButtonText}
                        setBackButtonText={this.setBackButtonText}
                        userFields={userFields}
                        attemptSaveSignUpFields={attemptSaveSignUpFields}
                    />
                )
            },
            {
                name: 'Frequency',
                component: (
                    <Frequency
                        setNextButtonText={this.setNextButtonText}
                        setBackButtonText={this.setBackButtonText}
                        userFields={userFields}
                        attemptSaveSignUpFields={attemptSaveSignUpFields}
                    />
                )
            },
            {
                name: 'Payment',
                component: (
                    <Payment
                        setNextButtonText={this.setNextButtonText}
                        setBackButtonText={this.setBackButtonText}
                        userFields={userFields}
                        attemptSignUp={attemptSignUp}
                        userMessage={userMessage}
                        history={null}
                    />
                )
            }
        ];

        return (
            <div className="main-wrapper row">
                <div className="left-side-component col-12 col-md-9">
                    <div className="app-checkout-lines progtrckr">
                        <div />
                        <div />
                        <div />
                    </div>
                    <StepZilla
                        // startAtStep={3}
                        steps={steps}
                        isValidated={false}
                        showNavigation={true}
                        backButtonText={
                            <BackButtonText
                                ref={bbt => {
                                    this.backButtonText = bbt;
                                }}
                            />
                        }
                        backButtonCls="app-back-button"
                        onStepChange={this.onStepChange}
                        nextButtonText={
                            <NextButtonText
                                ref={nbt => {
                                    this.nextButtonText = nbt;
                                }}
                            />
                        }
                    />
                </div>
                <div className="right-side-component col-12 col-md-3">
                    <ComposedPlan
                        userFields={userFields}
                        attemptSaveSignUpFields={attemptSaveSignUpFields}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => selector(state, false, ['auth-user']);

const mapDispatchToProps = dispatch => {
    return {
        attemptSaveSignUpFields: data =>
            dispatch(attemptSaveSignUpFields(data)),
        attemptSignUp: data => dispatch(attemptSignUp(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
