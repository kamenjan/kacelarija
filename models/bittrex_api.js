let asyncFs = require('../utils/async_fs');
let _ = require('lodash');
let bittrex = require('node-bittrex-api');

let exchange_m = require('../models/exchange_model');

let bittrexApi = {};

bittrexApi.getNonZeroBalances = async () => {

	/* TODO: Grab uid from session ... or something */
	let keyPair = await exchange_m.getApiKey('4b7a3452-6a76-4ee8-9c0a-184c994f9a0a', 'bittrex');

	/* START Read from remote API */
	// let market = await _getBalances(keyPair.key, keyPair.secret);
	// await asyncFs.writeFile('./__DEV/balance.json', JSON.stringify(market));
	/* END Read from remote API */
	/* OR */
	/* START: Read from file */
	let market = await asyncFs.readFile('./__DEV/balance.json');
	market = JSON.parse(market);
	/* END: Read from file */

	return market.result.filter( (ticker) => {
		return ticker.Balance > 0;
	}).map( (ticker) => {
		ticker.Balance = (ticker.Balance).toFixed(8);
		ticker.Available = (ticker.Available).toFixed(8);
		return ticker;
	});
};


function _getBalances(key, secret) {
	bittrex.options({
		'apikey' : key,
		'apisecret' : secret
	});

	return new Promise(function(resolve, reject) {
		bittrex.getbalances( function( data, err ) {
			if (err) {
				reject(Error(err));
			}
			resolve(data);
		});
	});
}

module.exports = bittrexApi;