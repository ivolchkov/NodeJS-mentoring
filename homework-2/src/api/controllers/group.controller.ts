import { Inject, Service } from 'typedi';
import GroupService from '../../services/group.service';
import { GroupDTO, GroupModel } from '../../models/Group';

@Service()
export default class GroupController {
    constructor(@Inject('group.service') private groupService: GroupService) {
        this.groupService = groupService;
    }

    public createGroup(group: GroupDTO): Promise<GroupModel | Error> {
        return this.groupService.create(group);
    }

    public getById(id: string): Promise<GroupModel> {
        return this.groupService.getById(id);
    }

    public findAll(): Promise<Array<GroupModel>> {
        return this.groupService.findAll();
    }

    public updateGroup(id: string, group: GroupDTO): Promise<GroupModel> {
        return this.groupService.update(id, group);
    }

    public deleteGroup(id: string): Promise<number> {
        return this.groupService.delete(id);
    }
}
