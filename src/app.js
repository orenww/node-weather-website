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
let eBay = require('ebay-node-api')

let ebayUK = new eBay({
    clientID: 'OrenWein-comparep-SBX-7dc78fcfb-22b79c89',
    env: 'SANDBOX', // optional default = 'PRODUCTION',
    headers:{ // optional
        'X-EBAY-C-MARKETPLACE-ID': 'EBAY_GB' // For Great Britain https://www.ebay.co.uk
    },
    'GLOBAL-ID':'EBAY_GB'
    
})

let ebaySP = new eBay({
    clientID: 'OrenWein-comparep-SBX-7dc78fcfb-22b79c89',
    env: 'SANDBOX', // optional default = 'PRODUCTION',
    headers:{ // optional
        'X-EBAY-SOA-GLOBAL-ID': 'EBAY_ES' // For Great Britain https://www.ebay.co.uk
    },
    'GLOBAL-ID':'EBAY_SP'
})

// Setup handlesbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Ebay for Raviv',
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

    ebayUK.findItemsByKeywords({
        keywords: req.query.address,
        sortOrder: 'PricePlusShippingLowest', //https://developer.ebay.com/devzone/finding/callref/extra/fndcmpltditms.rqst.srtordr.html
        pageNumber: 1,
        limit: 3
        
    }).then((data) => {        
        let items = []
        // console.log(JSON.stringify(data[0].ack[0]));
        // console.log(JSON.stringify(data));

        let item = data[0].searchResult[0].item[0];
        let price  = item.sellingStatus[0].currentPrice[0]

        items[0] = {
            itemId: item.itemId,
            country: item.country,
            title: item.title,                
            price: price['__value__'] + ' : ' + price['@currencyId']
        }

        console.log('---------------------------------------');
        console.log(items[0]);

        ebaySP.findItemsByKeywords({
            keywords: req.query.address,
            sortOrder: 'PricePlusShippingLowest', //https://developer.ebay.com/devzone/finding/callref/extra/fndcmpltditms.rqst.srtordr.html
            pageNumber: 1,
            limit: 3
            
        }).then((data) => {        
            // console.log(JSON.stringify(data));
            console.log(JSON.stringify(data[0].ack[0]));
    
            let item1 = data[0].searchResult[0].item[0];
            let price1  = item.sellingStatus[0].currentPrice[0]
    
            items[1] = {
                itemId: item1.itemId,
                country: item1.country,
                title: item1.title,                
                price: price1['__value__'] + ' : ' + price1['@currencyId']
            }

            console.log('---------------------------------------');
            console.log(items[1]);
    
            res.send({
                itemId: [items[0].itemId, items[1].itemId],
                country: [items[0].country, items[1].country],
                title: [items[0].title, items[1].title],                
                price: [items[0].price, items[1].price],                
            })
        }, (error) => {
            console.log(error);
        });

        // res.send({
        //     itemId: item.itemId,
        //     country: item.country,
        //     title: item.title,                
        //     price: price['__value__'] + ' : ' + price['@currencyId']
        // })
    }, (error) => {
        console.log(error);
    });

    // geocode(req.query.address, (error, {lat, lot, location} = {}) => {
    //     if (error) {
    //         return res.send({ error })            
    //     }
        
    //     forecast(lat, lot, (error, forecastData) => {
    //         if(error) {
    //             return res.send({ error })            
    //         }        
    
    //         res.send({
    //             forecast: forecastData,
    //             location,                
    //             address: req.query.address
    //         })
    //     })
    // })

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

 