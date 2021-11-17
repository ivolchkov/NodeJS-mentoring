import winston from 'winston';
import { loggerConfig } from '../config/logger.config';

export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({ level: loggerConfig.consoleLogLevel }),
        new winston.transports.File({
            filename: loggerConfig.filename,
            level: loggerConfig.fileLogLevel
        })
    ]
});
