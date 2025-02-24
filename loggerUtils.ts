import winston from 'winston';

const timeFormat = 'YYYY-MM-DD HH:mm:ss';
const printformat = info => `[${info.timestamp}] ${info.level}: ${info.message}`;

const options = {
    level: 'info',
    transports: [
        // Write all logs with level `info` and below to console
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({format: timeFormat}),
                winston.format.printf(printformat),
                winston.format.align()
            )
        }),

        // Write all logs with level `info` and below to `combined.log`
        new winston.transports.File({
            filename: 'logs/combined.log',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            format: winston.format.combine(
                winston.format.timestamp({format: timeFormat}),
                winston.format.printf(printformat),
                winston.format.align()
            )
        }),

        // Write all logs with level `error` and below to `error.log`
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            format: winston.format.combine(
                winston.format.timestamp({format: timeFormat}),
                winston.format.printf(printformat),
                winston.format.align()
            )
        })
    ]
};

export const logger = winston.createLogger(options);