const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config 
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve 
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }
    const address = req.query.address;
    geocode(address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                address: location
            })
        });
    })

});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: "This is a help page.",
        name: 'Andrew'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorType: 'Help article not found.',
        name: 'Andrew'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorType: 'Page not found.',
        name: 'Andrew'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});