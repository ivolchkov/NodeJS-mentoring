interface LoggerConfig {
    consoleLogLevel: string,
    fileLogLevel: string,
    filename: string
}

export const loggerConfig:LoggerConfig = {
    consoleLogLevel: 'info',
    fileLogLevel: 'error',
    filename: './log/logging.log'
};
