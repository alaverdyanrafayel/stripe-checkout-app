import mongoose from 'mongoose';
const User = mongoose.model('User');

export class UserService {

    constructor () {}

    static async insertAndFetchUser(data) {
        return User.create(data);
    }
}

