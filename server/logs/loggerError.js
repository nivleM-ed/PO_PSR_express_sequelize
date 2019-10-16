var { createLogger, format, transports } = require('winston');
var winston = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

var options = {
  fileError: {
    level: 'error',
    filename: './logs/error.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    timestamp: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
var loggerError = new winston.createLogger({
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.File(options.fileError)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
// loggerInfo.stream = {
//   write: function(message, encoding) {
//     // use the 'info' log level so the output will be picked up by both transports (file and console)
//     loggerInfo.info(message);
//   },
// };

module.exports = loggerError;