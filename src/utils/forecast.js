const request = require('request');

const forcast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=fb0d5d93b18d7f29d24fc537168f36b1&query=${lat,long}&units=f`;

    request({
        url,
        json: true
    }, (error, {
        body
    }) => {
        if (error) {
            callback('Unable to connect to forecast services.', undefined)
        } else if (body.error) {
            callback('Invalid coordinates. Can not find location', undefined);
        } else {
            callback(undefined, `It is currently ${body.current.temperature} degrees. It feels like ${body.current.feelslike} degrees.`)
        }
    })
}

module.exports = forcast