import { Router } from 'express';
import endpoints from './endpoints';

export class AuthModule {
    apiRouter;
    router;

    constructor (apiRouter) {
        this.apiRouter = apiRouter;
        this.router = Router();
    }

    createEndpoints() {
        this.assignRouter();
        this.assignEndpoints();
    }

    assignRouter() {
        this.apiRouter.use('/auth', this.router);
    }

    assignEndpoints() {
        endpoints(this.router);
    }
}
