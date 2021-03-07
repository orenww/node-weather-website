import * as chokidar from 'chokidar';
import moveFiles from './move-files'

export default class Watcer {
    private watcher:any;
    private pathToMonitor = 'C:\\tmp\\aaaaaaaaaaa\\beforeLoad'

    constructor(private moveFiles:moveFiles){
        this.openWatcher()
    }

    public openWatcher() {
        this.watcher = chokidar.watch(this.pathToMonitor, { persistent: true, ignoreInitial:true });
    
        
        // Add event listeners.
        // this.watcher.on('add', (path: string) => {
        //     console.log(`File ${path} has been added`);
        //     // logger.info(`File ${path} has been added`)
        //     // io.emit('pathToMonitorUpdated', `File ${path} has been added`) 
            
        //     // setTimeout(() => {
        //         this.moveFiles.move(path);
        //     // },3000)
            
        // }
    
        // // .on('change', path => console.log(`File ${path} has been changed`))
        // // .on('unlink', path => console.log(`File ${path} has been removed`));
    
        // // More possible events.
        // this.watcher.on('addDir', (path:string) => {
        //     console.log(`Directory ${path} has been added`)
    
        //     // logger.info(`File ${path} has been added`)
        //     // io.emit('pathToMonitorUpdated', `File ${path} has been added`) 
            
    
        //     // setTimeout(() => {
        //         this.moveFiles.move(path);
        //     // },6000)        
        // })
        
        // .on('unlinkDir', path => console.log(`Directory ${path} has been removed`))
        // .on('error', error => console.log(`Watcher error: ${error}`))
        // .on('ready', () => console.log('Initial scan complete. Ready for changes'))
    
        // return this.watcher;
    }
}

