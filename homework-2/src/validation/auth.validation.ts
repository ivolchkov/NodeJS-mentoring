import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { errorHandling } from './user.validation';

const schema = Joi.object().keys({
    login: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
});

export function validateAuthSchema() {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });
        errorHandling(error, res, next);
    };
}
