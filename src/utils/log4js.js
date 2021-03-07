const  log4js = require("log4js");

const getLogger = (callback) => {
    // log
    log4js.configure({
        appenders: { cheese: { type: "file", filename: "./logs/cheese.log" } },
        categories: { default: { appenders: ["cheese"], level: "info" } }
    });

    const logger = log4js.getLogger("cheese");    
    callback(logger)    

    return logger;
}


module.exports = getLogger 