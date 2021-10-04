import { Inject, Service } from 'typedi';
import { Logger } from 'winston';
import { GroupDTO, GroupModel } from '../models/Group';
import GroupRepository from '../repositories/group.repository';


@Service({ id: 'group.service' })
export default class GroupService {
    constructor(@Inject('group.repository') private groupRepository: GroupRepository,
        @Inject('logger') private logger: Logger) {
        this.groupRepository = groupRepository;
        this.logger = logger;
    }

    public create(group: GroupDTO): Promise<GroupModel> {
        return this.groupRepository.create(group);
    }

    public async getById(id: string): Promise<GroupModel> {
        const group = await this.groupRepository.findById(id);

        if (group === null) {
            const errorMessage = `Group with id: ${id} has not been found.`;
            this.logger.info(errorMessage);

            throw new Error(errorMessage);
        }
        return group;
    }

    public async findAll(): Promise<Array<GroupModel>> {
        const groups = await this.groupRepository.findAll();

        if (groups.length === 0) {
            const errorMessage = 'There were no groups found.';
            this.logger.info(errorMessage);

            throw new Error(errorMessage);
        }
        return groups;
    }

    public update(id: string, group: GroupDTO): Promise<GroupModel> {
        return this.groupRepository.update(id, group);
    }

    public delete(id: string): Promise<number> {
        return this.groupRepository.delete(id);
    }
}

