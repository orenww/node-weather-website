const request = require('request')

const forcast = (lat, lot, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=61809e5a91c18f8973cc701c22ff1e19&query=' + lat + ',' + lot
    
    request({ url, json: true }, (error, {body}) => {  
        if(error) {
            callback('unable to connect to weather service')            
        } else if (body.error) {
            callback('Unable to find the location')            
        } else {
            callback(undefined,{                
                desc: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })            
        }
    })
}
    

module.exports = forcast