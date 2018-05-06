import React from 'react';
import { Container, Col, Row, FormGroup, Label, Input } from 'reactstrap';
import { cloneDeep, isEqual } from 'lodash';
import { isEmpty } from 'validator';
import { REQUIRED } from 'configs/constants';

const signUpState = {
    fields: {
        frequency: '',
        comment: ''
    }
};

export class Frequency extends React.Component {
    constructor(props) {
        super(props);
        const userFields = props.userFields.toJS();
        Object.keys(signUpState.fields).forEach(key => {
            signUpState.fields[key] = userFields[key];
        });
        this.state = cloneDeep(signUpState);
        props.setNextButtonText('CONTINUE TO PAYMENT');
        props.setBackButtonText('Back to Personal Info');
    }

    componentWillUnmount() {
        const { attemptSaveSignUpFields } = this.props;
        const { fields } = this.state;
        attemptSaveSignUpFields({ fields });
    }

    handleChange = ({
        target: { value, name }
    }: {
        target: { value: string, name: string }
    }) => {
        const newState = cloneDeep(this.state);

        newState.fields[name] = value;

        if (!isEqual(this.state, newState)) {
            this.setState(newState);
        }
        if (name === 'frequency') {
            this.props.attemptSaveSignUpFields({ fields: newState.fields });
        }
    };

    render() {
        return (
            <Container className="frequency">
                <Col xs="12" md="12" lg="12" className="location-inner">
                    <h3>Pickup Frequency</h3>
                    
                    <Row className="frequency-row">
                        <Col className="pickup-frequency left" xs="12" md="6" lg="6">
                            <div className="radio">
                                <input
                                    id="radio-1"
                                    name="frequency"
                                    type="radio"
                                    value="weekly"
                                    checked={
                                        this.state.fields.frequency === 'weekly'
                                    }
                                    onChange={this.handleChange}
                                />
                                <label
                                    htmlFor="radio-1"
                                    className="radio-label"
                                >
                                    Weekly
                                    <p>4x per month</p>
                                </label>
                            </div>
                        </Col>
                        <Col className="pickup-frequency right" xs="12" md="6" lg="6">
                            <div className="radio">
                                <input
                                    id="radio-2"
                                    name="frequency"
                                    type="radio"
                                    value="biWeekly"
                                    checked={
                                        this.state.fields.frequency ===
                                        'biWeekly'
                                    }
                                    onChange={this.handleChange}
                                />
                                <label
                                    htmlFor="radio-2"
                                    className="radio-label"
                                >
                                    Bi-Weekly
                                    <p>2x per month</p>
                                </label>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col xs="12">
                    <Row>
                        <Col xs="12">
                            <FormGroup className="question-form">
                                <Label
                                    htmlFor="exampleText"
                                    className="questions"
                                >
                                    Do you have any notes for our drivers?
                                </Label>
                                <Input
                                    type="textarea"
                                    name="comment"
                                    id="exampleText"
                                    value={this.state.fields.comment}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
            </Container>
        );
    }
}

export default Frequency;
