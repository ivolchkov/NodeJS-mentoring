import { NextFunction, Request, Response } from 'express';
import { Logger } from 'winston';

export default (logger: Logger)  => {
    return (req: Request, res: Response, next: NextFunction) : void => {
        const { method, params } = req;
        logger.info(`[${method}] method has been called with the params ${JSON.stringify(params)}`);
        next();
    };
};
