import { Inject, Service } from 'typedi';
import UserService from '../../services/user.service';
import { UserDTO, UserModel } from '../../models/User';
import { UserGroupModel } from '../../models/UserGroup';

@Service()
export default class UserController {
    constructor(@Inject('user.service') private userService: UserService) {
        this.userService = userService;
    }

    public createUser(user: UserDTO): Promise<UserModel | Error> {
        return this.userService.create(user);
    }

    public addUsersToGroup(groupId: string, userIds: Array<string>): Promise<Array<UserGroupModel>> {
        return this.userService.addUsersToGroup(groupId, userIds);
    }

    public getById(id: string): Promise<UserModel> {
        return this.userService.getById(id);
    }

    public getByLoginSubstringAndLimitSize(loginSubstring: string, limit: number): Promise<Array<UserModel>> {
        return this.userService.getByLoginSubstringAndLimitSize(loginSubstring, limit);
    }

    public updateUser(id: string, user: UserDTO): Promise<UserModel> {
        return this.userService.update(id, user);
    }

    public deleteUser(id: string): Promise<UserModel> {
        return this.userService.delete(id);
    }
}
