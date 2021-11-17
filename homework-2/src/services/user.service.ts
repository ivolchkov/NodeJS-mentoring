import { Inject, Service } from 'typedi';
import { Logger } from 'winston';
import { UserDTO, UserModel } from '../models/User';
import UserRepository from '../repositories/user.repository';
import { number } from 'joi';

@Service({ id: 'user.service' })
export default class UserService {
    constructor(
        @Inject('user.repository') private userRepository: UserRepository,
        @Inject('logger') private logger: Logger) {
        this.userRepository = userRepository;
        this.logger = logger;
    }

    public create(user: UserDTO): Promise<UserModel | Error> {
        return this.userRepository.create(user);
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

        if (users === null) {
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

