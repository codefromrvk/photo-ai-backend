import winston from 'winston';

const { combine, splat, timestamp, printf } = winston.format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] : ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(splat(), timestamp(), customFormat),
  transports: [
    //
    // - Write to all logs to `combined.log`
    // - Write all logs error to `error.log`.
    //
    new winston.transports.Console(),
    new winston.transports.File({ filename: './logger/combined.log' }),
    new winston.transports.File({ filename: './logger/error.log', level: 'error' }),
  ],
});

export default logger;
