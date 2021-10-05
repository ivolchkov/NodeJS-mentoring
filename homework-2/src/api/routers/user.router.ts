import { validateLimit, validateLoginSubstring, validateSchema } from '../../validation/user.validation';
import { NextFunction, Request, Response, Router } from 'express';
import UserController from '../controllers/user.controller';
import { asyncHandler } from '../utils/async.handler';
import serviceMethodDescription from '../middlewares/service.method.description';
import { UserDTO } from '../../models/User';
import { Logger } from 'winston';

export default (userController: UserController, logger: Logger): Router => {
    const router = Router({ caseSensitive: true, strict: true });

    router.post('/',
        serviceMethodDescription(logger),
        validateSchema(),
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            try {
                const user = req.body as UserDTO;
                const createdUser = await userController.createUser(user);
                res.json(createdUser);
            } catch (e) {
                next(e);
            }
        }));

    router.post('/addUsersToGroup',
        serviceMethodDescription(logger),
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            try {
                const userGroupModels = await userController.addUsersToGroup(req.body.groupId, req.body.userIds);
                res.status(200).json(userGroupModels);
            } catch (e) {
                next(e);
            }
        }));

    router.get('/:id',
        serviceMethodDescription(logger),
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            try {
                const user = await userController.getById(req.params.id);
                res.json(user);
            } catch (e) {
                next(e);
            }
        }));

    router.get('/:loginSubstring/:limit',
        serviceMethodDescription(logger),
        validateLoginSubstring(),
        validateLimit(),
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            try {
                const user = await userController.getByLoginSubstringAndLimitSize(
                    req.params.loginSubstring,
                    +req.params.limit
                );
                res.json(user);
            } catch (e) {
                next(e);
            }
        }));

    router.put('/:id',
        serviceMethodDescription(logger),
        validateSchema(),
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            try {
                const user = await userController.updateUser(
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
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            try {
                const user = await userController.deleteUser(req.params.id);
                res.json(user);
            } catch (e) {
                next(e);
            }
        }));

    return router;
};

