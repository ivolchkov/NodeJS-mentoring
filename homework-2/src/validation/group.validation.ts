import Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { errorHandling } from './user.validation';

const schema = Joi.object().keys({
    name: Joi.string().alphanum().required(),
    permissions: Joi.array().items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
});

export function validateGroupSchema() {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });
        errorHandling(error, res, next);
    };
}
