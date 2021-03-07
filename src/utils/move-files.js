"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import log4js from "log4js";
const path = require("path");
const slashes_1 = require("slashes");
class Watcer {
    constructor() {
        this.rootPathLoaded = 'C:\\tmp\\aaaaaaaaaaa\\afterLoad\\';
    }
    // const logger = log4js((logger) => {    
    //     return logger;
    // })
    move(pathToRemove) {
        console.log('path - ', pathToRemove);
        const fileName = path.basename(pathToRemove);
        console.log(fileName);
        let pathLoaded = path.join(this.rootPathLoaded, fileName);
        pathLoaded = slashes_1.addSlashes(pathLoaded);
        console.log('pathLoaded - ', pathLoaded);
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
exports.default = Watcer;
//# sourceMappingURL=move-files.js.map