const express = require('express')
const path = require('path')
const chokidar = require('chokidar');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlesbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Oren w'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Oren w me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is help file',
        name: 'Orenw'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'You must a insert an address'
        })
    }

    geocode(req.query.address, (error, {lat, lot, location} = {}) => {
        if (error) {
            return res.send({ error })            
        }
        
        forecast(lat, lot, (error, forecastData) => {
            if(error) {
                return res.send({ error })            
            }        
    
            res.send({
                forecast: forecastData,
                location,                
                address: req.query.address
            })
        })
    })

    // res.send({
    //     location:req.query.address,
    //     forecast: 44
    // })
})

app.get('/products', (req, res) => {    
    if (!req.query.search) {
        return res.send({
            error:'You must a serach term'
        })
    }
    res.send({
      products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found' ,
        title: '404',        
        name: 'Orenw'           
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found' ,
        title: '404',        
        name: 'Orenw'       
    })
})

app.listen(port, () => {
    console.log('Server is up on port - ' + port);
})


// // Initialize watcher.
// const watcher = chokidar.watch('C:\\tmp\\aaaaaaaaaaa', { persistent: true });
 
// // Add event listeners.
// watcher
//   .on('add', path => console.log(`File ${path} has been added`))
//   .on('change', path => console.log(`File ${path} has been changed`))
// //   .on('unlink', path => console.log(`File ${path} has been removed`));
 
// // More possible events.
// watcher
//   .on('addDir', path => console.log(`Directory ${path} has been added`))
// //   .on('unlinkDir', path => console.log(`Directory ${path} has been removed`))
//   .on('error', error => console.log(`Watcher error: ${error}`))
//   .on('ready', () => console.log('Initial scan complete. Ready for changes'))

 