import { Inject, Service } from 'typedi';
import User, { UserDTO, UserModel } from '../models/User';
import { Op, Transaction } from 'sequelize';
import UserGroup, { UserGroupModel } from '../models/UserGroup';

@Service({ id: 'user.repository' })
export default class UserRepository {
    constructor(@Inject('op') private op: typeof Op) {
        this.op = op;
    }

    public create(user: UserDTO): Promise<UserModel> {
        return User.create(user);
    }

    public bulkCreateUserGroupRelation(userGroupList: { GroupUuid: string; UserUuid: string }[], transaction: Transaction) : Promise<Array<UserGroupModel>> {
        return UserGroup.bulkCreate(userGroupList, { transaction: transaction });
    }

    public getById(id: string): Promise<UserModel> {
        return User.findOne({
            where: {
                uuid: id,
                isDeleted: false
            }
        });
    }

    public getByLoginSubstringAndLimitSize(loginSubstring: string, limit: number): Promise<Array<UserModel>> {
        return User.findAll({
            where: {
                login: {
                    [this.op.like]: `%${loginSubstring}%`
                },
                isDeleted: false
            }, limit
        });
    }

    public async update(id: string, userDto: UserDTO): Promise<UserModel> {
        const user = await User.findByPk(id);

        if (!user) {
            throw new Error(`User with id: ${id} has not been found.`);
        }

        user.login = userDto.login;
        user.password = userDto.password;
        user.age = userDto.age;

        return user.save();
    }

    public async delete(id: string): Promise<UserModel> {
        const user = await User.findByPk(id);

        if (!user) {
            throw new Error(`User with id: ${id} has not been found.`);
        }

        user.isDeleted = true;

        return user.save();
    }
}
