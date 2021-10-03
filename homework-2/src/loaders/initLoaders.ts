import { logger } from './logger.loader';
import dependencyInjectorLoader from './dependency.injector.loader';
import expressLoader from './express.loader';
import { Application } from 'express';
import User from '../models/User';
import { sequelizeConnection } from './db.connection.loader';

export default (): Application => {
    sequelizeConnection.sync()
        .then(() => {
            logger.info('Database schema has successfully been synced');
        });

    const userModel = {
        name: 'userModel' as string,
        model: new User()
    };

    const containerDependencies = dependencyInjectorLoader({
        models: [
            userModel
        ]
    });
    logger.info('Dependency Injector loaded');

    const app = expressLoader(containerDependencies);
    logger.info('Express loaded');

    return app;
};

