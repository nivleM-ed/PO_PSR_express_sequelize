var { createLogger, format, transports } = require('winston');
var winston = require('winston');
const { combine, timestamp, label, prettyPrint } = format;


var options = {
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    timestamp: true,
  },
  fileDebug: {
    level: 'debug',
    filename: './logs/debug.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    timestamp: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
var loggerDebug = new winston.createLogger({
  format: combine(
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new winston.transports.File(options.fileDebug),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
// loggerDebug.stream = {
//   write: function(message, encoding) {
//     // use the 'info' log level so the output will be picked up by both transports (file and console)
//     loggerDebug.info(message);
//   },
// };

module.exports = loggerDebug;