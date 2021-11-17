import dotenv from 'dotenv'

const env = dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });
if (env.error) {
    throw new Error(env.error.message);
}

interface LoggerConfig {
    consoleLogLevel: string,
    fileLogLevel: string,
    filename: string
}

export const loggerConfig:LoggerConfig = {
    consoleLogLevel: process.env.CONSOLE_LOG_LEVEL,
    fileLogLevel: process.env.FILE_LOG_LEVEL,
    filename: process.env.LOG_FILENAME
};
