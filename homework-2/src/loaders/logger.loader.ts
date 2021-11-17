import winston from 'winston';
import { loggerConfig } from '../config/logger.config';

export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: loggerConfig.consoleLogLevel
        }),
        new winston.transports.File({
            filename: loggerConfig.filename,
            level: loggerConfig.fileLogLevel
        })
    ],
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        winston.format.printf(info => `${info.level}: [${info.timestamp}]: ${info.message}`)
    )
});
