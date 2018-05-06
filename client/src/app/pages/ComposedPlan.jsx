import React from 'react';
import organic_waste from '../../../assets/images/organic_waste.png';
import { Input } from 'reactstrap';
import { Map } from 'components';

const frequencyMap = {
    biWeekly: 'Bi-Weekly',
    monthly: 'Monthly',
    weekly: 'Weekly'
};

class ComposedPlan extends React.Component {
    handleChange = ({ target: { value, name } }) => {
        const { attemptSaveSignUpFields } = this.props;
        let fields = {};
        fields[name] = value;
        attemptSaveSignUpFields({ fields });
    };
    render() {
        const userFields = this.props.userFields.toJS();
        const {
            latitude,
            longitude,
            frequency,
            binType,
            hasCoupon,
            coupon
        } = userFields;
        let price = 19;
        if (frequency === 'weekly') {
            price += 10;
        }

        if (binType === 'binRollcart') {
            price += 6;
        }

        return (
            <div className="right-side-content">
                <h4>Compost Plan</h4>
                <hr />
                <p>Pickup Type</p>
                <div className="pickup-type">
                    <div className="pickup-type-content">
                        <img src={organic_waste} />
                        <h5>
                            Organic Waste{' '}
                            <span>Turn your scraps into soil</span>
                        </h5>
                    </div>
                </div>
                {latitude &&
                    longitude && (
                        <React.Fragment>
                            <p>Address</p>
                            <Map
                                latitude={latitude}
                                longitude={longitude}
                                height="140px"
                                width="100%"
                            />
                        </React.Fragment>
                    )}

                <div className="compost-frequency">
                    <div>
                        <span>Frequency</span>
                        <span className="right">{frequencyMap[frequency]}</span>
                    </div>
                </div>
                <Input
                    type="select"
                    name="hasCoupon"
                    className="promocode-input"
                    value={hasCoupon}
                    onChange={this.handleChange}
                >
                    <option className="promo-code" value="" disabled>
                        Have a Promo Code?
                    </option>
                    <option>YES</option>
                    <option>NO</option>
                </Input>
                {hasCoupon === 'YES' && (
                    <Input
                        value={coupon}
                        placeholder="Type your promo code"
                        name="coupon"
                        onChange={this.handleChange}
                    />
                )}
                <div className="first-month">
                    <div>
                        <span>First Month</span>
                        <span className="right">Free</span>
                    </div>
                    <div>
                        <span>Bin Delivery</span>
                        <span className="right">Free</span>
                        <hr />
                    </div>
                </div>
                <div className="monthly-fee">
                    <span>Monthly Fee</span>
                    <span className="right">$ {price}/mo</span>
                </div>
            </div>
        );
    }
}

export default ComposedPlan;
