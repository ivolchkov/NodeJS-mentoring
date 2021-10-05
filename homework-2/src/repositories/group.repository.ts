import { Service } from 'typedi';
import Group, { GroupDTO, GroupModel } from '../models/Group';


@Service({ id: 'group.repository' })
export default class GroupRepository {
    public create(group: GroupDTO): Promise<GroupModel> {
        return Group.create(group);
    }

    public findById(id: string): Promise<GroupModel> {
        return Group.findByPk(id);
    }

    public findAll(): Promise<Array<GroupModel>> {
        return Group.findAll();
    }

    public async update(id: string, groupDto: GroupDTO): Promise<GroupModel> {
        const group = await Group.findByPk(id);

        if (!group) {
            throw new Error(`Group with id: ${id} has not been found.`);
        }

        group.name = groupDto.name;
        group.permissions = groupDto.permissions;

        return group.save();
    }

    public delete(id: string): Promise<number> {
        return Group.destroy({
            where: { uuid: id }
        });
    }
}
