import { validateGroupSchema } from '../../validation/group.validation';
import { NextFunction, Request, Response, Router } from 'express';
import { asyncHandler } from '../utils/async.handler';
import { GroupDTO } from '../../models/Group';
import serviceMethodDescription from '../middlewares/service.method.description';
import verifyToken from '../middlewares/verify.token';
import { ContainerDependencies } from '../../loaders/dependency.injector.loader';

export default (containerDependencies: ContainerDependencies): Router => {
    const { groupController, logger, jwt, authConfig } = containerDependencies;
    const router = Router({ caseSensitive: true, strict: true });

    router.post('/',
        serviceMethodDescription(logger),
        verifyToken(jwt, authConfig),
        validateGroupSchema(),
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            try {
                const group = req.body as GroupDTO;
                const createdUser = await groupController.createGroup(group);
                res.json(createdUser);
            } catch (e) {
                next(e);
            }
        }));

    router.get('/:id',
        serviceMethodDescription(logger),
        verifyToken(jwt, authConfig),
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            try {
                const group = await groupController.getById(req.params.id);
                res.json(group);
            } catch (e) {
                next(e);
            }
        }));

    router.get('/',
        serviceMethodDescription(logger),
        verifyToken(jwt, authConfig),
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            try {
                const users = await groupController.findAll();
                res.json(users);
            } catch (e) {
                next(e);
            }
        }));

    router.put('/:id',
        serviceMethodDescription(logger),
        verifyToken(jwt, authConfig),
        validateGroupSchema(),
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            try {
                const user = await groupController.updateGroup(
                    req.params.id,
                    req.body
                );
                res.json(user);
            } catch (e) {
                next(e);
            }
        }));

    router.delete('/:id',
        serviceMethodDescription(logger),
        verifyToken(jwt, authConfig),
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            try {
                const deleted = await groupController.deleteGroup(req.params.id);
                if (deleted === 1) {
                    res.status(204).json({ message: 'Group has been deleted successfully' });
                } else {
                    res.status(404).json({ message: `Group with id: ${req.params.id} has not been found.` });
                }
            } catch (e) {
                next(e);
            }
        }));

    return router;
};

