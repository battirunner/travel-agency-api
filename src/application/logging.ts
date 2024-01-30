// external import
import winston from "winston";
import expressWinston from "express-winston";

// custom log format
const logFormat = winston.format.printf(
  ({ level, message, timestamp, stack }) => {
    return `${level} ${timestamp} ${stack || message}`;
  }
);

// configure logger
export const logger = winston.createLogger({
  level: "silly",
  format: winston.format.combine(
    winston.format.colorize(),

    winston.format.timestamp({
      // format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    // winston.format.metadata(),

    winston.format.prettyPrint(),
    logFormat
  ),
  defaultMeta: { service: "flyingbird" },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    //
    // - Write to all logs with level `info` and below to `quick-start-combined.log`.
    // - Write all logs error (and below) to `quick-start-error.log`.
    //
    // new winston.transports.File({ filename: "errorLogs.log", level: "error" }),
    // new winston.transports.File({ filename: "combinedLogs.log" }),
  ],
});

//expresswinston wraps the logger so that it can be used as middleware
export const loggerExpress = expressWinston.logger({
  winstonInstance: logger,
  statusLevels: true,
});
