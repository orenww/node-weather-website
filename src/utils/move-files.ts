// import log4js from "log4js";
import * as path from 'path';
import {addSlashes, stripSlashes } from 'slashes';

export default class Watcer {
    private rootPathLoaded:string = 'C:\\tmp\\aaaaaaaaaaa\\afterLoad\\'

    constructor(){

    }
    // const logger = log4js((logger) => {    
    //     return logger;
    // })
    
    public move(pathToRemove:string) { 
    
        console.log('path - ',pathToRemove);
        const fileName = path.basename(pathToRemove)
        console.log(fileName);    
        let pathLoaded = path.join(this.rootPathLoaded, fileName) 
        pathLoaded = addSlashes(pathLoaded); 
        console.log('pathLoaded - ',pathLoaded);
        
    
        // Async with callbacks:
        // this.fse.move(pathToRemove, pathLoaded, err => {
        //     if (err) {
        //         console.log('fse.move - ', err);
        //         return console.error(err)
        //     }
        //     console.log('success!')
        // })
    }
}

