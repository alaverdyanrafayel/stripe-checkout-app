export default (mongoose) => {
    let UserSchema = mongoose.Schema({
        email: { type: String, index: true },
        first_name: { type: String },
        last_name: { type: String },
        address: { type: String },
        phone: { type: Number },
        comment: { type: String },
        location: {
            type: [Number],
            index: '2d'
        },
        bin_type: { type: String, enum: ['binRollcart','binOnly'] },
        frequency: { type: String, enum: ['weekly', 'biWeekly'] },
        customer_id: String
    });

    return mongoose.model('User', UserSchema);
};

