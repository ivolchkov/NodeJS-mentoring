import { Container } from 'typedi';
import { logger } from './logger.loader';
import { Model, Op } from 'sequelize';
import { UserAttributes, UserDTO } from '../models/User';
import UserController from '../api/controllers/user.controller';

export default ({ models }: { models: { name: string; model: Model<UserAttributes, UserDTO> }[] }): ContainerDependencies  => {
    try {
        models.forEach(m => {
            Container.set(m.name, m.model);
        });
        Container.set('logger', logger);
        Container.set('op', Op);
        logger.info('All dependencies were injected into the container');

        return {
            userController: Container.get(UserController)
        };
    } catch (e) {
        logger.error(`Error was occurred on dependency injector loader: ${e}`);
        throw e;
    }
};

export interface ContainerDependencies {
    userController:UserController
}
