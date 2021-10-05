import { Inject, Service } from 'typedi';
import { Logger } from 'winston';
import { UserDTO, UserModel } from '../models/User';
import UserRepository from '../repositories/user.repository';
import { Sequelize, Transaction } from 'sequelize';
import GroupRepository from '../repositories/group.repository';
import { UserGroupModel } from '../models/UserGroup';

@Service({ id: 'user.service' })
export default class UserService {
    constructor(
        @Inject('user.repository') private userRepository: UserRepository,
        @Inject('group.repository') private groupRepository: GroupRepository,
        @Inject('logger') private logger: Logger,
        @Inject('sequelize') private sequelize: Sequelize) {
        this.userRepository = userRepository;
        this.groupRepository = groupRepository;
        this.logger = logger;
        this.sequelize = sequelize;
    }

    public create(user: UserDTO): Promise<UserModel | Error> {
        return this.userRepository.create(user);
    }

    public async addUsersToGroup(groupId: string, userIds: Array<string>): Promise<Array<UserGroupModel>> {
        try {
            return this.sequelize.transaction({
                isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
            }, async t => {
                const userGroups = userIds.map((userId: string) => {
                    return {
                        UserUuid: userId,
                        GroupUuid: groupId
                    };
                });
                return this.userRepository.bulkCreateUserGroupRelation(userGroups, t);
            });
        } catch (err) {
            const errorMessage = `An error has been occurred during saving new user to group relation record. Error message: ${err.message}`;

            this.logger.error(errorMessage);
            throw new Error(errorMessage);
        }
    }

    public async getById(id: string): Promise<UserModel> {
        const user = await this.userRepository.getById(id);

        if (user === null) {
            const errorMessage = `User with id: ${id} has not been found.`;
            this.logger.info(errorMessage);

            throw new Error(errorMessage);
        }
        return user;
    }

    public async getByLoginSubstringAndLimitSize(loginSubstring: string, limit: number): Promise<Array<UserModel>> {
        const users = await this.userRepository.getByLoginSubstringAndLimitSize(loginSubstring, limit);

        if (users.length === 0) {
            const errorMessage = `Users with which contain: '${loginSubstring}' substring 
            and limit size: ${limit} have not been found.`;
            this.logger.info(errorMessage);

            throw new Error(errorMessage);
        }

        return users;
    }

    public update(id: string, user: UserDTO): Promise<UserModel> {
        return this.userRepository.update(id, user);
    }

    public async delete(id: string): Promise<UserModel> {
        return this.userRepository.delete(id);
    }
}

