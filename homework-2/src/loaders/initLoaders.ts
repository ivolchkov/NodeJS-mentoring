import { logger } from './logger.loader';
import dependencyInjectorLoader from './dependency.injector.loader';
import expressLoader from './express.loader';
import { Application } from 'express';
import modelsLoader from './db.models.loader';
import { sequelizeConnection } from './db.connection.loader';

export default (): Application => {
    void sequelizeConnection.sync();
    logger.info('Database schema has successfully been synced');

    const databaseModels = modelsLoader();

    const containerDependencies = dependencyInjectorLoader(databaseModels);
    logger.info('Dependency Injector loaded');

    const app = expressLoader(containerDependencies);
    logger.info('Express loaded');

    return app;
};

