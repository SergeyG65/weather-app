const path = require('path')
const request = require('request')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sergey Gankin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sergey Gankin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Help page is down with technical issues',
        name: 'Sergey Gankin'
    })
})

app.get('/weather', (req, res) => {
    // if (!req.query.address) {
    //     res.send({
    //         error: 'Error, please provide address!'
    //     })
    // } else {
    //     res.send({
    //         forecast: 'It is snowing',
    //         location: req.query.address,
    //     })
    // }
    if (!req.query.address) {
        res.send({
            error: 'Error, please provide address!'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                res.send({
                    error: 'Unable to find location. Try another search.'
                })
            } else {
                forecast(latitude, longitude, (error, forecastData) => {
            // forecast({latitude, longitude}, (error, forecastData) => {
                    if (error) {
                            res.send({
                                error: 'Location could not be retrieved!'
                            })
                        } else {
                            res.send({
                                location: location,
                                forecast: forecastData
                            })
                        }

                    }
    
                )}
            }    
        )}
    }
)

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sergey Gakin',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sergey Gakin',
        errorMessage: 'Page not found'
    })
})

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Sergey'
//     }, {
//         name: 'Kelly'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>Something about me</h1>')
// })

// app.get('/weather', (req, res) => {
//     res.send([{
//         weather: "response.body.current.weather_descriptions[0]. + It is currently + response.body.current.temperature + degrees outside and feels like  + response.body.current.feelslike + ."
//     }, {
//         location: "location: response.body.features[0].place_name"
//     }])
// })

app.listen(port,() => {
    console.log('Server is up on port 3000')
})