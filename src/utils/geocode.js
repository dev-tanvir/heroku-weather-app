const request = require('request')

const geocode = (address, callback) => {
    const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGFudmlyZmFpc2FsMDEiLCJhIjoiY2tyaTU1M3I0MGphYzJwcGVnZWtkdjIwOCJ9.Jp5iymehcVY6hl9BB0Xf8A&limit=1'

    request({url: URL, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to Geocoding service!', undefined)

        } else if (response.body.features.length == 0) {
            callback('Please provide right address name!', undefined)

        } else {
            callback(undefined, {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode