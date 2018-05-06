import { AuthModule } from './auth';

export default (router) => {

    const auth = new AuthModule(router);
    const modules = [
        auth
    ];

    modules.forEach((module) => module.createEndpoints());
};
