import Joi, { ValidationError } from 'joi';
import { badRequest } from '@hapi/boom';
import { logger } from '../loaders/logger.loader';
import { NextFunction, Response, Request } from 'express';

const schema = Joi.object().keys({
    login: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    age: Joi.number().greater(3).less(130).required()
});
const loginSubstringSchema = Joi.string().alphanum().required();
const limitSchema = Joi.number().positive().required();

export function validateSchema() {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });
        errorHandling(error, res, next);
    };
}

export function validateLoginSubstring() {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = loginSubstringSchema.validate(req.params.loginSubstring, {
            abortEarly: false,
            allowUnknown: false
        });
        errorHandling(error, res, next);
    };
}

export function validateLimit() {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = limitSchema.validate(req.params.limit, {
            abortEarly: false,
            allowUnknown: false
        });

        errorHandling(error, res, next);
    };
}

export function errorHandling(error: ValidationError, res: Response, next: NextFunction) : void {
    if (error?.isJoi) {
        logger.info(error.message);
        void res.json(badRequest(error.message).output.payload);
    } else {
        return next();
    }
}
