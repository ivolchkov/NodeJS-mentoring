import { Inject, Service } from 'typedi';
import GroupService from '../../services/group.service';
import { GroupDTO, GroupModel } from '../../models/Group';
import { Measure } from '../middlewares/execution.time.measure';

@Service()
export default class GroupController {
    constructor(@Inject('group.service') private groupService: GroupService) {
        this.groupService = groupService;
    }

    @Measure
    public createGroup(group: GroupDTO): Promise<GroupModel | Error> {
        return this.groupService.create(group);
    }

    @Measure
    public getById(id: string): Promise<GroupModel> {
        return this.groupService.getById(id);
    }

    @Measure
    public findAll(): Promise<Array<GroupModel>> {
        return this.groupService.findAll();
    }

    @Measure
    public updateGroup(id: string, group: GroupDTO): Promise<GroupModel> {
        return this.groupService.update(id, group);
    }

    @Measure
    public deleteGroup(id: string): Promise<number> {
        return this.groupService.delete(id);
    }
}
