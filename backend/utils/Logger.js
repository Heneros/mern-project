const morgan = require("morgan");

const {createLogger, format, transports}  = require("winston");

require("winston-daily-rotate-file");

const {combine, timestamp, prettyPrint} = format;

const fileRotateTransport = new transports.DailyRotateFile({
    filename: "logs/combined-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "14d"
})

const systemLogs = createLogger({
    level: "http",
    format: combine(
        timestamp({
     format: "YYYY-MM-DD hh:mm:ss.SSS A",
            }),
            prettyPrint()
    ),transports:[
        fileRotateTransport,
        new transports.File({
                level: "error",
      filename: "logs/error.log",
        })
    ],
    exceptionHandlers: [ new transports.File({filename: "logs/exception.log"})],
    rejectionHandlers: [new transports.File({ filename:
        "logs/rejections.log"
    })]

})

module.exports = {systemLogs,  fileRotateTransport}