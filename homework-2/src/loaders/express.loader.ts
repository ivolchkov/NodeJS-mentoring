import express, { Application } from 'express';
import router from '../api/routers/user.router';
import { ContainerDependencies } from './dependency.injector.loader';

export default (containerDependencies: ContainerDependencies): Application => {
    const app = express();

    app.use(express.json());
    app.use('/api/v1/users', router(containerDependencies.userController));

    return app;
};

