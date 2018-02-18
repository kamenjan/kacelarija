let asyncFs = require('../utils/async_fs');
let _ = require('lodash');
let binance = require('binance');

let exchange_m = require('../models/exchange_model');

let binanceApi = {};

binanceApi.getNonZeroBalances = async () => {

	/* TODO: Grab uid from session ... or something */
	let keyPair = await exchange_m.getApiKey('4b7a3452-6a76-4ee8-9c0a-184c994f9a0a', 'binance');
	let balance = await _getBalances(keyPair.key, keyPair.secret, true);

	/* Write to file for development purposes */
	// await asyncFs.writeFile('./__DEV/binance_balance.json', JSON.stringify(balance));

	return balance.balances.map( ticker => {
		ticker.Source = 'binance';
		ticker.Currency = ticker.asset;
		ticker.Balance = (parseFloat(ticker.free) + parseFloat(ticker.locked)).toFixed(8);
		ticker.Available = parseFloat(ticker.free).toFixed(8);
		delete ticker.asset;
		delete ticker.free;
		delete ticker.locked;
		return ticker;
	}).filter( ticker => {
		return ticker.Balance > 0;
	});
};


async function _getBalances(key, secret, readFromFile = false) {

	if (readFromFile) {
		return JSON.parse(await asyncFs.readFile('./__DEV/binance_balance.json'));
	}

	const binanceRest = new binance.BinanceRest({
		key: key, // Get this from your account on binance.com
		secret: secret, // Same for this
		timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
		recvWindow: 10000, // Optional, defaults to 5000, increase if you're getting timestamp errors
		disableBeautification: false,
		handleDrift: false
	});

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