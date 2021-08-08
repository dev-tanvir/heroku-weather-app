const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=95566683f38b729aff97b2d149ec6225&query=' + latitude + ',' + longitude + '&units=m'
    
    request({ url, json: true}, (error, { body }) => {  // using { body } in place of response object as we only need body property of response object i.e object property destructering
        
        if (error) {
            callback('Unable to connect to weather service!', undefined)

        } else if (body.error) {
            callback(response.body.error.info, undefined)

        } else {
            callback(undefined, 
                body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees. But it feels like ' + body.current.feelslike + ' degrees.')
        }

    })

}

module.exports = forecast