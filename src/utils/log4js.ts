import * as log4js from 'log4js';

export default class Logger {
    public getLogger(callback:Function){
        // log
        log4js.configure({
            appenders: { cheese: { type: "file", filename: "./logs/cheese.log" } },
            categories: { default: { appenders: ["cheese"], level: "info" } }
        });
    
        const logger = log4js.getLogger("cheese");    
        
    
        logger.log = () =>{
            console.log('logger.log');        
        }
    
        // logger.log.error = () =>{
        //     console.log('logger.log.error');        
        // }
    
        callback(logger)    
    
    
        return logger;
    }
}




