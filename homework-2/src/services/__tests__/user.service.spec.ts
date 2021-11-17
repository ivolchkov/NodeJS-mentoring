import UserRepository from '../../repositories/user.repository';
import { UserDTO, UserModel } from '../../models/User';
import UserService from '../user.service';
import { Logger } from 'winston';
import { Sequelize } from 'sequelize';
import { Transaction, TransactionOptions } from 'sequelize/types/lib/transaction';

describe('User service tests', () => {
    let userRepository: UserRepository;
    let logger: Logger;
    let sequelize: Sequelize;
    let userService: UserService;

    let createFn = jest.fn();
    let bulkCreateUserGroupRelationFn = jest.fn();
    let getByIdFn = jest.fn();
    let getByLoginSubstringAndLimitSize = jest.fn();
    let updateFn = jest.fn();
    let deleteFn = jest.fn();

    beforeEach(() => {
        userRepository = ({
            create: createFn.mockResolvedValue(userModelList[0]),
            bulkCreateUserGroupRelation : bulkCreateUserGroupRelationFn.mockResolvedValue(userModelList),
            getById: getByIdFn.mockResolvedValue(userModelList[0]),
            getByLoginSubstringAndLimitSize: getByLoginSubstringAndLimitSize.mockResolvedValue(userModelList),
            update: updateFn.mockResolvedValue(userModelList[2]),
            delete: deleteFn.mockResolvedValue(1)
        }) as undefined as UserRepository;
        logger = ({
            info: jest.fn()
        }) as undefined as Logger;
        sequelize = ({
            transaction: jest.fn((options: TransactionOptions, autoCallback: any) : any => {
                return autoCallback();
            })
        }) as undefined as Sequelize;

        userService = new UserService(userRepository, logger, sequelize);
    });

    const userModelList: UserModel[] = [{
        uuid: '2793ac41-4f74-40a0-a0b6-d901c8221750',
        login: 'admin@gmail.com',
        password: '1234',
        age: 25,
        isDeleted: false
    }, {
        uuid: '2791ac41-4f74-40a0-a0b6-d901c8221751',
        login: 'developer@gmail.com',
        password: '1234',
        age: 25,
        isDeleted: false
    }, {
        uuid: '2791ac41-4f74-40a0-a0b6-d901c8221751',
        login: 'developer@gmail.com',
        password: '1234',
        age: 25,
        isDeleted: false
    }];

    const { login, password, age, isDeleted } = userModelList[0];
    const userData: UserDTO = { login, password, age, isDeleted };

    it('Create user', async () => {
        const userModel = await userService.create(userData);

        expect(userModel).toEqual(userModelList[0]);
        expect(userRepository.create).toHaveBeenCalled();
        expect(userRepository.create).toBeCalledWith(userData);
    });

    it('Add user to group', async () => {
        const users = await userService.addUsersToGroup('admin', [userModelList[0].uuid, userModelList[1].uuid]);

        expect(users).toEqual(userModelList);
        expect(userRepository.bulkCreateUserGroupRelation).toHaveBeenCalled();
    })

    it('Find user by id', async () => {
        const userModel = await userService.getById('1');

        expect(userModel).toEqual(userModelList[0]);
        expect(userRepository.getById).toHaveBeenCalled();
        expect(userRepository.getById).toBeCalledWith('1');
    });

    it('Should throw error when user is null', async () => {
        getByIdFn.mockResolvedValue(null);

        await expect(userService.getById('1')).rejects.toThrowError();

        expect(userRepository.getById).toHaveBeenCalled();
        expect(userRepository.getById).toBeCalledWith('1');
    })

    it('Find users by login substring and limit size', async () => {
        const userModelList = await userService.getByLoginSubstringAndLimitSize('luke', 2);

        expect(userModelList).toEqual(userModelList);
        expect(userRepository.getByLoginSubstringAndLimitSize).toHaveBeenCalled();
    });

    it('Should throw error when user list is empty', async () => {
        getByLoginSubstringAndLimitSize.mockResolvedValue([]);

        await expect(userService.getByLoginSubstringAndLimitSize('luke', 2)).rejects.toThrowError();

        expect(userRepository.getByLoginSubstringAndLimitSize).toHaveBeenCalled();
    })

    it('Update user', async() => {
        const userModel = await userService.update('1', userData);

        expect(userModel).toEqual(userModelList[2]);
        expect(userRepository.update).toHaveBeenCalled();
        expect(userRepository.update).toBeCalledWith('1', userData);
    });

    it('Delete user', async() => {
        const number = await userService.delete('1');

        expect(number).toEqual(1);
        expect(userRepository.delete).toHaveBeenCalled();
        expect(userRepository.delete).toBeCalledWith('1');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
