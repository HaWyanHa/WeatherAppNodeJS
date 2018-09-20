/*jshint esversion: 6*/

const request = require('request');

const getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/a447c01dcf23d1d2c505169273ed4279/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('unable to connect to Forecast.io server.');
        } else if (response.statusCode >= 400) {
            callback('unable to fetch weather.');
        } else if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });
};


// lat, lng, callback
module.exports.getWeather = getWeather;