let asyncFs = require('../utils/async_fs');
let _ = require('lodash');
let binance = require('binance');

let exchange_m = require('../models/exchange_model');

let binanceApi = {};

binanceApi.getNonZeroBalances = async () => {

	/* TODO: Grab uid from session ... or something */
	let keyPair = await exchange_m.getApiKey('4b7a3452-6a76-4ee8-9c0a-184c994f9a0a', 'binance');

	/* START Read from remote API */
	let market = await _getBalances(keyPair.key, keyPair.secret);
	console.log(market);
	// await asyncFs.writeFile('./__DEV/balance.json', JSON.stringify(market));
	/* END Read from remote API */
	/* OR */
	/* START: Read from file */
	// let market = await asyncFs.readFile('./__DEV/balance.json');
	// market = JSON.parse(market);
	/* END: Read from file */

	// return market.result.filter( (ticker) => {
	// 	return ticker.Balance > 0;
	// }).map( (ticker) => {
	// 	ticker.Balance = (ticker.Balance).toFixed(8);
	// 	ticker.Available = (ticker.Available).toFixed(8);
	// 	return ticker;
	// });
};


function _getBalances(key, secret) {

	const api = require('binance');
	const binanceRest = new api.BinanceRest({
		key: key, // Get this from your account on binance.com
		secret: secret, // Same for this
		timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
		recvWindow: 10000, // Optional, defaults to 5000, increase if you're getting timestamp errors
		disableBeautification: false,
		/*
		 * Optional, default is false. Binance's API returns objects with lots of one letter keys.  By
		 * default those keys will be replaced with more descriptive, longer ones.
		 */
		handleDrift: false
		/* Optional, default is false.  If turned on, the library will attempt to handle any drift of
		 * your clock on it's own.  If a request fails due to drift, it'll attempt a fix by requesting
		 * binance's server time, calculating the difference with your own clock, and then reattempting
		 * the request.
		 */
	});

	// binanceRest.account((err, data) => {
	// 	if (err) {
	// 		console.error(err);
	// 	} else {
	// 		console.log(data);
	// 	}
	// });

	return new Promise(function(resolve, reject) {
		binanceRest.account((err, data) => {
			if (err) {
				reject(Error(err));
			}
			resolve(data);
		});
	});

}

module.exports = binanceApi;