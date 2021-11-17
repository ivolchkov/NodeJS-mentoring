import Joi from 'joi';
import { badRequest } from '@hapi/boom';
import { logger } from './index';
import { NextFunction, Response, Request } from 'express';

const schema = Joi.object().keys({
    login: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    age: Joi.number().greater(3).less(130).required()
});

export function validateSchema() {
    return (req: Request, res: Response, next: NextFunction) : void => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });

        if (error?.isJoi) {
            logger.info(error.message);
            void res.json(badRequest(error.message).output.payload);
        } else {
            return next();
        }
    };
}
