import { Container } from 'typedi';
import { logger } from './logger.loader';
import { Op } from 'sequelize';
import UserController from '../api/controllers/user.controller';
import { DatabaseModel } from './db.models.loader';
import GroupController from '../api/controllers/group.controller';
import { sequelizeConnection } from './db.connection.loader';
import { Logger } from 'winston';

export default (models: Array<DatabaseModel>): ContainerDependencies => {
    try {
        models.forEach(m => {
            Container.set(m.name, m.model);
        });
        Container.set('logger', logger);
        Container.set('op', Op);
        Container.set('sequelize', sequelizeConnection);
        logger.info('All dependencies were injected into the container');

        return {
            userController: Container.get(UserController),
            groupController: Container.get(GroupController),
            logger: Container.get('logger')
        };
    } catch (e) {
        logger.error(`Error was occurred on dependency injector loader: ${e}`);
        throw e;
    }
};

export interface ContainerDependencies {
    userController: UserController;
    groupController: GroupController;
    logger: Logger;
}
