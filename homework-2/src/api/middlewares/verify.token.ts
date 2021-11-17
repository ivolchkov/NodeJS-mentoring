import { NextFunction, Request, Response } from 'express';
import { AuthConfig } from '../../config/auth.config';

export default (jwt: any, config: AuthConfig) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const token = req.headers['x-access-token'];

        if (!token) {
            res.status(401).send('A token is required for authentication');
        }
        try {
            jwt.verify(token, config.jwtSecret);
        } catch (err) {
            res.status(403).send('Invalid Token');
        }
        next();
    };
};
