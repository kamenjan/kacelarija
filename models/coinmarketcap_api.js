let asyncFs = require('../utils/async_fs');
let _ = require('lodash');
let request = require('request');

/* TODO: create a new balance table (id, uid, source [bittrex, binance, ethereum, bitcoin, custom], balance, available) */
// let balance_m = require('../models/balance_model');
let exchange_m = require('../models/exchange_model');

let coinMarketCapApi = {};

coinMarketCapApi.getCoinsData = async () => {
	let coinsData = await _coinlist(true);
	/* Write to file for development purposes */
	// await asyncFs.writeFile('./__DEV/coin_market_cap_data.json', coinsData);
	return coinsData;
};


async function _coinlist(readFromFile = false) {

	if (readFromFile) {
		return JSON.parse(await asyncFs.readFile('./__DEV/coin_market_cap_data.json'));
	}

	return new Promise( (resolve, reject) => {
		request('https://api.coinmarketcap.com/v1/ticker/?limit=0', (error, response, body) => {
			if (!error && response.statusCode === 200) {
				resolve(JSON.parse(body));
			} else {
				reject(Error(error));
			}
		});
	});
}

module.exports = coinMarketCapApi;