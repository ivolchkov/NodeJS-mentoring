import { validateLimit, validateLoginSubstring, validateSchema } from '../../validation/user.validation';
import { Request, Response, Router } from 'express';
import UserController from '../controllers/user.controller';
import { asyncHandler } from '../utils/async.handler';
import { UserDTO } from '../../models/User';

export default (userController: UserController): Router => {
    const router = Router({ caseSensitive: true, strict: true });

    router.post('/',
        validateSchema(),
        asyncHandler(async (req: Request, res: Response) => {
            try {
                const user = req.body as UserDTO;
                const createdUser = await userController.createUser(user);
                res.json(createdUser);
            } catch (e) {
                res.status(500).json({ message: e.message });
            }
        }));

    router.post('/addUsersToGroup',
        asyncHandler(async (req: Request, res: Response) => {
            try {
                const userGroupModels = await userController.addUsersToGroup(req.body.groupId, req.body.userIds);
                res.status(200).json(userGroupModels);
            } catch (e) {
                res.status(404).json({ message: e.message });
            }
        }));

    router.get('/:id',
        asyncHandler(async (req: Request, res: Response) => {
            try {
                const user = await userController.getById(req.params.id);
                res.json(user);
            } catch (e) {
                res.status(404).json({ message: e.message });
            }
        }));

    router.get('/:loginSubstring/:limit',
        validateLoginSubstring(),
        validateLimit(),
        asyncHandler(async (req: Request, res: Response) => {
            try {
                const user = await userController.getByLoginSubstringAndLimitSize(
                    req.params.loginSubstring,
                    +req.params.limit
                );
                res.json(user);
            } catch (e) {
                res.status(404).json({ message: e.message });
            }
        }));

    router.put('/:id',
        validateSchema(),
        asyncHandler(async (req: Request, res: Response) => {
            try {
                const user = await userController.updateUser(
                    req.params.id,
                    req.body
                );
                res.json(user);
            } catch (e) {
                res.status(404).json({ message: e.message });
            }
        }));


    router.delete('/:id',
        asyncHandler(async (req: Request, res: Response) => {
            try {
                const user = await userController.deleteUser(req.params.id);
                res.json(user);
            } catch (e) {
                res.status(404).json({ message: e.message });
            }
        }));

    return router;
};

