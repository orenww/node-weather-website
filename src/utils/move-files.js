const fse = require('fs-extra')
const  log4js = require("./log4js");
const path = require('path');
const { log } = require('console');
const { addSlashes, stripSlashes } = require('slashes');

const rootPathLoaded = 'C:\\tmp\\aaaaaaaaaaa\\afterLoad\\'

const logger = log4js((logger) => {    
    return logger;
})

const move = (pathToRemove) => { 

    console.log('path - ',pathToRemove);
    const fileName = path.basename(pathToRemove)
    console.log(fileName);    
    let pathLoaded = path.join(rootPathLoaded, fileName) 
    pathLoaded = addSlashes(pathLoaded); 
    console.log('pathLoaded - ',pathLoaded);
    

    // Async with callbacks:
    fse.move(pathToRemove, pathLoaded, err => {
        if (err) {
            console.log('fse.move - ', err);
            return console.error(err)
        }
        console.log('success!')
    })
}

module.exports = {
    move: move    
}