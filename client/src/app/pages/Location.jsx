// @flow
import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import { Map } from 'components';
import { cloneDeep, isEqual } from 'lodash';
const signUpState = {
    fields: {
        binType: ''
    }
};
type Props = {
    attemptSaveSignUpFields: (val: Object) => {},
    userFields: any
};
export class Location extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        const userFields = props.userFields.toJS();
        Object.keys(signUpState.fields).forEach(key => {
            signUpState.fields[key] = userFields[key];
        });
        this.state = cloneDeep(signUpState);
        props.setNextButtonText('CONTINUE TO FREQUENCY');
        props.setBackButtonText('Back to Personal Info');
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
            this.props.attemptSaveSignUpFields({ fields: newState.fields });
        }
    };
    componentWillUnmount() {
        const { attemptSaveSignUpFields } = this.props;
        const { fields } = this.state;
        attemptSaveSignUpFields({ fields });
    }

    render() {
        const userFields = this.props.userFields.toJS();

        return (
            <div>
                <Container className="location">
                    <Col xs="12" md="12" lg="12" className="location-inner">
                        <h3>Pickup Location</h3>
                        <Row className="location-map">
                            <Col xs="12" sm="12" md="6">
                                <div className="pickup-location">
                                    <p>
                                        {userFields.firstName}{' '}
                                        {userFields.lastName}
                                    </p>
                                    {userFields.address
                                            .split(', ')
                                            .map((item, i) => (
                                            <p key={i}>{item}</p>
                                        ))}
                                </div>
                            </Col>
                            <Col
                                xs="12"
                                sm="12"
                                md="6"
                                className="pickup-location-map"
                            >
                                <Map
                                    width={'100%'}
                                    height={'243.5px'}
                                    latitude={userFields.latitude}
                                    longitude={userFields.longitude}
                                    zoomControl
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col xs="12" md="12" lg="12" className="location-inner second">
                        <p className="bin">Bin Type</p>
                        <Row className="pickup-bin-row">
                            <Col className="pickup-bin left" lg="6" md="6" xs="12">
                                <div className="radio">
                                    <input
                                        id="radio-1"
                                        name="binType"
                                        type="radio"
                                        value="binRollcart"
                                        checked={
                                            this.state.fields.binType ===
                                            'binRollcart'
                                        }
                                        onChange={this.handleChange}
                                    />
                                    <label
                                        htmlFor="radio-1"
                                        className="radio-label bin-header"
                                    >
                                        Bin + Rollcart<span className="rec">
                                            (Reccomended)
                                            <p className="bin-text">
                                                For those that have a driveway
                                                and want a rollcart for curbside
                                                pickup
                                            </p>
                                        </span>
                                    </label>
                                </div>
                            </Col>
                            <Col
                                className="pickup-bin right"
                                lg="6"
                                md="6"
                                xs="12"
                            >
                                <div className="radio">
                                    <input
                                        name="binType"
                                        id="radio-2"
                                        type="radio"
                                        value="binOnly"
                                        checked={
                                            this.state.fields.binType ===
                                            'binOnly'
                                        }
                                        onChange={this.handleChange}
                                    />
                                    <label
                                        htmlFor="radio-2"
                                        className="radio-label bin-header"
                                    >
                                        Bin Only
                                        <p className="bin-text">
                                            This is for apartment and highrise
                                            dwellers that do not have a driveway
                                        </p>
                                    </label>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Container>
            </div>
        );
    }
}

export default Location;
