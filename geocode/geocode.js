/*jshint esversion: 6*/

const request = require('request');



var geocodeAddress = (address, callback) => {
	let encodedAddress = encodeURIComponent(address);

	request({
		url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyD8_asD99AD1AoR93i0waaFwHb4dupBbAs`,
		json: true
	}, (error, response, body) => {
		if (error) {
			callback('unable to connect to the user servers.');
		} else if (body.status === 'ZERO_RESULTS') {   //specific to the google API
			callback('Unable to find that address');
		} else if (body.status === 'OK') {
			callback(undefined, {
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng
			});
		}
	});
};

module.exports.geocodeAddress = geocodeAddress;

//a447c01dcf23d1d2c505169273ed4279