const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e9714c9bfdea0a2943149fe3cc9f5cb9&query=' + latitude + ',' + longitude

    request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees outside and feels like " + response.body.current.feelslike + ". Wind is from " + response.body.current.wind_dir + ".")
        }
    })
}

module.exports = forecast