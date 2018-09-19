const request = require('request');
const yargs = require('yargs');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help', 'h')
	.argv;

console.log(argv);

let encodedAddress = encodeURIComponent(argv.a);

request({
	url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyD8_asD99AD1AoR93i0waaFwHb4dupBbAs`,
	json: true
}, (error, response, body) => {
	if (error) {
		console.log('unable to connect to the user servers.');
	} else if (body.status === 'ZERO_RESULTS') {   //specific to the google API
		console.log('Unable to find that address');
	} else if (body.status === 'OK') {
		console.log(`Address ${body.results[0].formatted_address}, and ${body.results[0].geometry.location.lat}, and ${body.results[0].geometry.location.lng}`);
	}
});


