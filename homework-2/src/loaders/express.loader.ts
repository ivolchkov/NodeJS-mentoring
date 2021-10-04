import express, { Application } from 'express';
import userRouter from '../api/routers/user.router';
import groupRouter from '../api/routers/group.router';
import { ContainerDependencies } from './dependency.injector.loader';

export default (containerDependencies: ContainerDependencies): Application => {
    const app = express();

    app.use(express.json());
    app.use('/api/v1/users', userRouter(containerDependencies.userController));
    app.use('/api/v1/groups', groupRouter(containerDependencies.groupController));

    return app;
};

