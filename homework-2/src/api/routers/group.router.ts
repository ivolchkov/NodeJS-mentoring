import { validateGroupSchema } from '../../validation/group.validation';
import { Request, Response, Router } from 'express';
import GroupController from '../controllers/group.controller';
import { asyncHandler } from '../utils/async.handler';
import { GroupDTO } from '../../models/Group';

export default (groupController: GroupController): Router => {
    const router = Router({ caseSensitive: true, strict: true });

    router.post('/',
        validateGroupSchema(),
        asyncHandler(async (req: Request, res: Response) => {
            try {
                const group = req.body as GroupDTO;
                const createdUser = await groupController.createGroup(group);
                res.json(createdUser);
            } catch (e) {
                res.status(500).json({ message: e.message });
            }
        }));

    router.get('/:id',
        asyncHandler(async (req: Request, res: Response) => {
            try {
                const group = await groupController.getById(req.params.id);
                res.json(group);
            } catch (e) {
                res.status(404).json({ message: e.message });
            }
        }));

    router.get('/',
        asyncHandler(async (req: Request, res: Response) => {
            try {
                const users = await groupController.findAll();
                res.json(users);
            } catch (e) {
                res.status(404).json({ message: e.message });
            }
        }));

    router.put('/:id',
        validateGroupSchema(),
        asyncHandler(async (req: Request, res: Response) => {
            try {
                const user = await groupController.updateGroup(
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
                const deleted = await groupController.deleteGroup(req.params.id);
                if (deleted === 1) {
                    res.status(204).json({ message: 'Group has been deleted successfully' });
                } else {
                    res.status(404).json({ message: `Group with id: ${req.params.id} has not been found.` });
                }
            } catch (e) {
                res.status(404).json({ message: e.message });
            }
        }));

    return router;
};

