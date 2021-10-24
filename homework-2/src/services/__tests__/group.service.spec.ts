import GroupRepository from '../../repositories/group.repository';
import { GroupDTO, GroupModel, Permission } from '../../models/Group';
import GroupService from '../group.service';
import { Logger } from 'winston';

describe('Group service tests', () => {
    let groupRepository: GroupRepository;
    let logger: Logger;
    let groupService: GroupService;

    let createFn = jest.fn();
    let findByIdFn = jest.fn();
    let findAllFn = jest.fn();
    let updateFn = jest.fn();
    let deleteFn = jest.fn();

    beforeEach(() => {
        groupRepository = ({
            create: createFn.mockResolvedValue(groupModelList[0]),
            findById: findByIdFn.mockResolvedValue(groupModelList[0]),
            findAll: findAllFn.mockResolvedValue(groupModelList),
            update: updateFn.mockResolvedValue(groupModelList[2]),
            delete: deleteFn.mockResolvedValue(1)
        }) as undefined as GroupRepository;
        logger = ({
            info: jest.fn()
        }) as undefined as Logger;
        groupService = new GroupService(groupRepository, logger);
    });

    const groupModelList: GroupModel[] = [{
        uuid: '2793ac41-4f74-40a0-a0b6-d901c8221750',
        name: 'admin',
        permissions: [
            Permission.READ,
            Permission.WRITE,
            Permission.DELETE
        ]
    }, {
        uuid: '2791ac41-4f74-40a0-a0b6-d901c8221751',
        name: 'developer',
        permissions: [
            Permission.READ,
            Permission.WRITE
        ]
    }, {
        uuid: '2791ac41-4f74-40a0-a0b6-d901c8221751',
        name: 'developer',
        permissions: [
            Permission.READ
        ]
    }];

    const { name, permissions } = groupModelList[0];
    const groupData: GroupDTO = { name, permissions };

    it('Create group', async () => {
        const groupModel = await groupService.create(groupData);

        expect(groupModel).toEqual(groupModelList[0]);
        expect(groupRepository.create).toHaveBeenCalled();
        expect(groupRepository.create).toBeCalledWith(groupData);
    });

    it('Find group by id', async () => {
        const groupModel = await groupService.getById('1');

        expect(groupModel).toEqual(groupModelList[0]);
        expect(groupRepository.findById).toHaveBeenCalled();
        expect(groupRepository.findById).toBeCalledWith('1');
    });

    it('Should throw error when group is null', async () => {
        findByIdFn.mockResolvedValue(null);

        await expect(groupService.getById('1')).rejects.toThrowError();

        expect(groupRepository.findById).toHaveBeenCalled();
        expect(groupRepository.findById).toBeCalledWith('1');
    })

    it('Find all groups', async () => {
        const groupModelList = await groupService.findAll();

        expect(groupModelList).toEqual(groupModelList);
        expect(groupRepository.findAll).toHaveBeenCalled();
    });

    it('Should throw error when group list is empty', async () => {
        findAllFn.mockResolvedValue([]);

        await expect(groupService.findAll()).rejects.toThrowError();

        expect(groupRepository.findAll).toHaveBeenCalled();
    })

    it('Update group', async() => {
        const groupModel = await groupService.update('1', groupData);

        expect(groupModel).toEqual(groupModelList[2]);
        expect(groupRepository.update).toHaveBeenCalled();
        expect(groupRepository.update).toBeCalledWith('1', groupData);
    });

    it('Delete group', async() => {
        const number = await groupService.delete('1');

        expect(number).toEqual(1);
        expect(groupRepository.delete).toHaveBeenCalled();
        expect(groupRepository.delete).toBeCalledWith('1');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
