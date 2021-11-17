import { NextFunction, Request, Response, Router } from 'express';
import serviceMethodDescription from '../middlewares/service.method.description';
import { asyncHandler } from '../utils/async.handler';
import { validateAuthSchema } from '../../validation/auth.validation';
import { ContainerDependencies } from '../../loaders/dependency.injector.loader';

export default (containerDependencies: ContainerDependencies): Router => {
    const { authController, logger } = containerDependencies;
    const router = Router({ caseSensitive: true, strict: true });

    router.post('/login',
        serviceMethodDescription(logger),
        validateAuthSchema(),
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            try {
                const jwtToken = await authController.login(req.body.login, req.body.password);
                res.json({ token: jwtToken });
            } catch (e) {
                next(e);
            }
        }));

    return router;
};

