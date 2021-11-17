import { Container } from 'typedi';
import { logger } from './logger.loader';
import { AuthConfig, authConfig } from '../config/auth.config';
import { Op } from 'sequelize';
import * as jwt from 'jsonwebtoken';
import UserController from '../api/controllers/user.controller';
import { DatabaseModel } from './db.models.loader';
import GroupController from '../api/controllers/group.controller';
import { sequelizeConnection } from './db.connection.loader';
import { Logger } from 'winston';
import AuthController from '../api/controllers/auth.controller';

export default (models: Array<DatabaseModel>): ContainerDependencies => {
    try {
        models.forEach(m => {
            Container.set(m.name, m.model);
        });
        Container.set('logger', logger);
        Container.set('op', Op);
        Container.set('sequelize', sequelizeConnection);
        Container.set('jwt', jwt);
        Container.set('authConfig', authConfig);
        logger.info('All dependencies were injected into the container');

        return {
            userController: Container.get(UserController),
            groupController: Container.get(GroupController),
            authController: Container.get(AuthController),
            logger: Container.get('logger'),
            jwt: Container.get('jwt'),
            authConfig: Container.get('authConfig')
        };
    } catch (e) {
        logger.error(`Error was occurred on dependency injector loader: ${e}`);
        throw e;
    }
};

export interface ContainerDependencies {
    userController: UserController;
    groupController: GroupController;
    authController: AuthController;
    logger: Logger;
    jwt: any;
    authConfig: AuthConfig;
}
