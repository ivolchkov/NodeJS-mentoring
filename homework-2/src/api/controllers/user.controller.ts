import { Inject, Service } from 'typedi';
import UserService from '../../services/user.service';
import { UserDTO, UserModel } from '../../models/User';
import { UserGroupModel } from '../../models/UserGroup';
import { Measure } from '../middlewares/execution.time.measure';

@Service()
export default class UserController {
    constructor(@Inject('user.service') private userService: UserService) {
        this.userService = userService;
    }

    @Measure
    public createUser(user: UserDTO): Promise<UserModel | Error> {
        return this.userService.create(user);
    }

    @Measure
    public addUsersToGroup(groupId: string, userIds: Array<string>): Promise<Array<UserGroupModel>> {
        return this.userService.addUsersToGroup(groupId, userIds);
    }

    @Measure
    public getById(id: string): Promise<UserModel> {
        return this.userService.getById(id);
    }

    @Measure
    public getByLoginSubstringAndLimitSize(loginSubstring: string, limit: number): Promise<Array<UserModel>> {
        return this.userService.getByLoginSubstringAndLimitSize(loginSubstring, limit);
    }

    @Measure
    public updateUser(id: string, user: UserDTO): Promise<UserModel> {
        return this.userService.update(id, user);
    }

    @Measure
    public deleteUser(id: string): Promise<UserModel> {
        return this.userService.delete(id);
    }
}
