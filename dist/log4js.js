"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
const getLogger = (callback) => {
    // log
    log4js_1.default.configure({
        appenders: { cheese: { type: "file", filename: "./logs/cheese.log" } },
        categories: { default: { appenders: ["cheese"], level: "info" } }
    });
    const logger = log4js_1.default.getLogger("cheese");
    logger.log = () => {
        console.log('logger.log');
    };
    // logger.log.error = () =>{
    //     console.log('logger.log.error');        
    // }
    callback(logger);
    return logger;
};
module.exports = getLogger;
//# sourceMappingURL=log4js.js.map