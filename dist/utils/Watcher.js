"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar_1 = __importDefault(require("chokidar"));
class Watcer {
    constructor() {
        this.pathToMonitor = 'C:\\tmp\\aaaaaaaaaaa\\beforeLoad';
    }
    openWatcher() {
        let watcher = chokidar_1.default.watch(this.pathToMonitor, { persistent: true, ignoreInitial: true });
        // Add event listeners.
        watcher.on('add', (path) => {
            // console.log(`File ${path} has been added`)
            // logger.info(`File ${path} has been added`)
            // io.emit('pathToMonitorUpdated', `File ${path} has been added`) 
            // setTimeout(() => {
            // moveFiles.move(path);
            // },3000)
        });
        // .on('change', path => console.log(`File ${path} has been changed`))
        //   .on('unlink', path => console.log(`File ${path} has been removed`));
        // More possible events.
        watcher.on('addDir', (path) => {
            console.log(`Directory ${path} has been added`);
            // logger.info(`File ${path} has been added`)
            // io.emit('pathToMonitorUpdated', `File ${path} has been added`) 
            // setTimeout(() => {
            // moveFiles.move(path);
            // },6000)        
        });
        //   .on('unlinkDir', path => console.log(`Directory ${path} has been removed`))
        // .on('error', error => console.log(`Watcher error: ${error}`))
        // .on('ready', () => console.log('Initial scan complete. Ready for changes'))
        return watcher;
    }
}
exports.default = Watcer;
//# sourceMappingURL=Watcher.js.map