import express, { Application } from 'express';
import userRouter from '../api/routers/user.router';
import groupRouter from '../api/routers/group.router';
import authRouter from '../api/routers/auth.router';
import { ContainerDependencies } from './dependency.injector.loader';
import unhandledErrorLogging from '../api/middlewares/unhandled.error.logging';
import cors from 'cors';

export default (containerDependencies: ContainerDependencies): Application => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use('/api/v1/users', userRouter(containerDependencies));
    app.use('/api/v1/groups', groupRouter(containerDependencies));
    app.use('/api/v1/auth', authRouter(containerDependencies));

    app.use(unhandledErrorLogging(containerDependencies.logger));

    process.on('uncaughtException', (err: Error) => {
        containerDependencies.logger.error(`Caught exception: ${err.name} - ${err.message}`);
    });
    process.on('unhandledRejection', () => {
        containerDependencies.logger.error('Unhandled rejection has been raised during application running');
    });

    return app;
};

