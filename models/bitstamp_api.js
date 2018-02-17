let asyncFs = require('../utils/async_fs');
let _ = require('lodash');
let Bitstamp = require('bitstamp');

let exchange_m = require('../models/exchange_model');

let bitstampApi = {};

bitstampApi.getNonZeroBalances = async () => {

	/* TODO: Grab uid from session ... or something */
	let keyPair = await exchange_m.getApiKey('4b7a3452-6a76-4ee8-9c0a-184c994f9a0a', 'bitstamp');
	let balance = await _getBalances(keyPair.key, keyPair.secret, true);

	/* Write to file for development purposes */
	// await asyncFs.writeFile('./__DEV/bitstamp_balance.json', JSON.stringify(balance));

	let balanceParsed = {};
	_.forOwn(balance, (value, key) => {
		let ticker = key.substring(0, 3);
		let property = key.substring(3).replace(/[_-]/g, "");
		if (!balanceParsed.hasOwnProperty(ticker)) { balanceParsed[ticker] = {} }
		balanceParsed[ticker][property] = value;
	});

	let balanceParsedNext = [];
	_.forOwn(balanceParsed, (value, key) => {
		let ticker = {
			Exchange: 'bitstamp',
			Currency: key.toUpperCase(),
			Balance: parseFloat(value.balance).toFixed(8),
			Available: parseFloat(value.available).toFixed(8)
		};
		if (parseFloat(ticker.Balance) > 0) { balanceParsedNext.push(ticker) }
	});
	return balanceParsedNext;
};


async function _getBalances(key, secret, readFromFile = false) {

	if (readFromFile) {
		return JSON.parse(await asyncFs.readFile('./__DEV/bitstamp_balance.json'));
	}

	let options = [
		key,
		secret,
		'672464',
		10000,
		'www.bitstamp.net'
	];

	let privateBitstamp = new Bitstamp(...options);

	return new Promise(function(resolve, reject) {
		privateBitstamp.balance(null, (err, data) => {
			if (err) {
				reject(Error(err));
			}
			resolve(data);
		});
	});
}

module.exports = bitstampApi;