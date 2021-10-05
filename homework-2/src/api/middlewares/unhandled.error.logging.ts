import { NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';

export default (logger: Logger) => {
    return (err: Error, req: Request, res: Response, next: NextFunction) : void => {
        if (err) {
            const { method, params } = req;
            const message = `[${method}] - params: ${JSON.stringify(params)}. Request has been failed with the following error: ${err.message}.`;

            logger.error(message);
            res.status(500).json({ message });
        }
        next();
    };
};
