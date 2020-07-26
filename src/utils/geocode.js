const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2VyZ2V5ZzY1IiwiYSI6ImNrY21lYWw1dzAwMXcycWxiZzN2ZW9tNzEifQ.g_qysdf30-S1yihs2c6Deg'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name 
            })
        }
    })
}

module.exports = geocode