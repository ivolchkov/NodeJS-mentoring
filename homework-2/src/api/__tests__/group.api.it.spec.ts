import 'reflect-metadata';
import initLoaders from '../../loaders/initLoaders';
import Group, { GroupDTO, Permission } from '../../models/Group';
import { NextFunction, Request, Response } from 'express';
import { AuthConfig } from '../../config/auth.config';

jest.mock('../middlewares/verify.token', () => {
    return (jwt: any, config: AuthConfig) => {
        return (req: Request, res: Response, next: NextFunction): void => {
            next();
        };
    };
});
jest.mock('../middlewares/execution.time.measure', () => ({
    Measure: () => (
        target: Object,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor => {
        const originalMethod: any = descriptor.value;
        descriptor.value = function (...args: any[]) {
            return originalMethod.apply(this, args);
        };

        return descriptor;
    }
}));
const app = initLoaders();
const request = require('supertest');

describe('Integration tests for group API', () => {
    const groupDtoList: GroupDTO[] = [{
        name: 'admin',
        permissions: [
            Permission.READ,
            Permission.WRITE,
            Permission.DELETE
        ]
    }, {
        name: 'developer',
        permissions: [
            Permission.READ,
            Permission.WRITE
        ]
    }, {
        name: 'scrum-master',
        permissions: [
            Permission.READ
        ]
    }];

    beforeEach(async () => {
        await Group.bulkCreate(groupDtoList);
    });

    afterEach(async () => {
        await Group.destroy({
            where: {},
        })
    })

    afterAll(async () => {
        await Group.destroy({
            where: {},
        })
    })

    it('POST /api/v1/groups', async () => {
        const groupData: GroupDTO = { name: 'test', permissions: [Permission.READ, Permission.DELETE] };

        const response = await request(app).post('/api/v1/groups')
            .send(groupData);

        expect(response.status).toBe(200);
        expect(response.body.name).toEqual(groupData.name);
        expect(response.body.permissions).toEqual(groupData.permissions);
    });

    it('GET /api/v1/groups', async () => {
        const response = await request(app).get('/api/v1/groups');

        expect(response.status).toBe(200);
        expect(response.body[0].name).toEqual(groupDtoList[0].name);
        expect(response.body[0].permissions).toEqual(groupDtoList[0].permissions);
        expect(response.body[1].name).toEqual(groupDtoList[1].name);
        expect(response.body[1].permissions).toEqual(groupDtoList[1].permissions);
    });
});

