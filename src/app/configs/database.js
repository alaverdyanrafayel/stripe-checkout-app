import {
    mongoUrl
} from '../helpers/config';
import models from '../models';
import mongoose from 'mongoose';

function mongoConnection() {
    function connect() {
        let timeout = 30 * 1000;
        let options = {
            connectTimeoutMS: timeout,
            keepAlive: timeout,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500
        };

        // Connect mongoose to the database
        return mongoose.connect(mongoUrl, options);
    }

    connect();
    mongoose.set('debug', true);

    // Load models
    models(mongoose);

    mongoose.connection.on('error', function(err) {
        console.error('Mongoose connection: error - ' + err);
    });

    mongoose.connection.on('connected', function() {
        console.info('Mongoose connection: connected');
    });

    mongoose.connection.on('open', function() {
        console.info('Mongoose connection: open');
    });

    mongoose.connection.on('reconnected', function() {
        console.info('Mongoose connection: reconnected');
    });
    mongoose.connection.on('reconnectFailed', function(err) {
        console.error('Mongoose reconnect: error - ' + err);
        capture.error(err);
    });

    mongoose.connection.on('disconnected', function() {
        console.warn('Mongoose connection: disconnected');
    });

    process.on('SIGINT', function() {
        mongoose.disconnect(function() {
            process.exit(0);
        });
    });

    process.on('SIGINT', function() {
        mongoose.disconnect(function() {
            process.exit(0);
        });
    });

    return mongoose;
}

export default mongoConnection();
