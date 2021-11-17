import express, { Application } from 'express';
import userRouter from '../api/routers/user.router';
import groupRouter from '../api/routers/group.router';
import { ContainerDependencies } from './dependency.injector.loader';
import unhandledErrorLogging from '../api/middlewares/unhandled.error.logging';

export default (containerDependencies: ContainerDependencies): Application => {
    const app = express();

    app.use(express.json());

    app.use('/api/v1/users', userRouter(containerDependencies.userController, containerDependencies.logger));
    app.use('/api/v1/groups', groupRouter(containerDependencies.groupController, containerDependencies.logger));

    app.use(unhandledErrorLogging(containerDependencies.logger));

    process.on('uncaughtException', (err: Error) => {
        containerDependencies.logger.error(`Caught exception: ${err.name} - ${err.message}`);
    });
    process.on('unhandledRejection', () => {
        containerDependencies.logger.error('Unhandled rejection has been raised during application running');
    });

    return app;
};

