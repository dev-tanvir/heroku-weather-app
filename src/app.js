const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(__filename)

// Server
const app = express()
const port = process.env.PORT || 5000   // process.env.PORT is for heroku deployment

// Path configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Application Settings 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

// Routes
app.get('', (req, res) => {
    // res.send('<h1>Hello World!</h1>')
    res.render('index', {
        title: 'Weather Application',
        author: 'Tanvir Faisal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather Application',
        author: 'Tanvir Faisal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather Application',
        author: 'Tanvir Faisal'
    })
})

app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => { 
        if (error) {                                                                
            return res.send({ error })                                        
        }
            
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({error })
            }
            
            res.send({
                address: req.query.address,
                forecast: forecastData,
                location,
            })
            

        })
        })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Tanvir Faisal',
        errorMessage: 'Help topic not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Tanvir Faisal',
        errorMessage: 'Page not found!'
    })
})

// Server Start
app.listen(port, () => {
    console.log('Server is up at port ' + port)
})