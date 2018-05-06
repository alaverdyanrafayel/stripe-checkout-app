import express from 'express';
import RateLimit from 'express-rate-limit';
import httpsRedirect from 'express-https-redirect';
import logger from 'morgan';
import helmet from 'helmet';
import { json, urlencoded } from 'body-parser';
import enableModules from './modules';
import limiter from './configs/limiter';
import corsOptions from './configs/cors';
import cors from 'cors';
import expressValidator from 'express-validator';
import { BAD_REQUEST_CODE } from './configs/status-codes';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { ServiceUnavailable } from './errors';
import params from './configs/params';
const helpers = require('../../build/helpers');

class Application {
    app;
    router;

    constructor () {
        this.app = express();
        this.initApp();
    }
    initApp() {
        this.configApp();
        this.setParams();
        this.setRouter();
        this.setErrorHandler();
        this.enableModules();
    }

    configApp() {
        if (this.app.get('env') !== 'production') {
            this.app.use(logger('dev'));
        }

        if (this.app.get('env') === 'production') {
            this.app.use('/', httpsRedirect(true));
        }

        this.app.use(cors(corsOptions))
                .use(expressValidator())
                .use(json( { limit: '50mb' } ))
                .use(urlencoded({ extended: true }))
                .use(cookieParser())
                .use(this.createLimiter())
                .use(helmet());
    }

    createLimiter() {
        return new RateLimit(limiter);
    }

    setParams() {
        this.app.set('json spaces', 4);
    }

    setRouter() {
        this.router = express.Router();
        this.app.use(`/api`, this.router);

        if (process.env.NODE_ENV === 'production') {
            let options = {
                maxAge: '30m',
            };
            
            this.app.use(express.static(helpers.root('client/production'), options));

            this.app.get('bundle.js', (req, res, next) => {
                req.url = req.url + '.gz';
                res.set('Content-Encoding', 'gzip');
                next();
            });

            this.app.get('*', (req, res) => {
                res.sendFile(helpers.root('client/production/index.html'));
            });
        }
    }

    setErrorHandler() {
        this.app.use(async (err, req, res, next) => {
            if(!err.status) {
                next(new ServiceUnavailable(err.message));
            }

            let status = err.status || BAD_REQUEST_CODE;

            return res.status (status).json({
                status: status,
                data: null,
                message: err.message || '',
                errors: err.errors || null,
                body: req.body
            });
        });
    }

    enableModules() {
        enableModules(this.router);
    }
}

export default () => new Application().app;
