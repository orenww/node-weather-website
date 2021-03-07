"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log4js = require("log4js");
class Logger {
    getLogger(callback) {
        // log
        log4js.configure({
            appenders: { cheese: { type: "file", filename: "./logs/cheese.log" } },
            categories: { default: { appenders: ["cheese"], level: "info" } }
        });
        const logger = log4js.getLogger("cheese");
        logger.log = () => {
            console.log('logger.log');
        };
        // logger.log.error = () =>{
        //     console.log('logger.log.error');        
        // }
        callback(logger);
        return logger;
    }
}
exports.default = Logger;
//# sourceMappingURL=log4js.js.map