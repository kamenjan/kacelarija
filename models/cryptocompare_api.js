let asyncFs = require('../utils/async_fs');
let _ = require('lodash');
let request = require('request');

/* TODO: create a new balance table (id, uid, source [bittrex, binance, ethereum, bitcoin, custom], balance, available) */
// let balance_m = require('../models/balance_model');
let exchange_m = require('../models/exchange_model');

let cryptoCompareApi = {};

cryptoCompareApi.getCoinsData = async () => {
	let coinsData = await _coinlist(true);
	return coinsData;
};


async function _coinlist(readFromFile = false) {

	if (readFromFile) {
		return JSON.parse(await asyncFs.readFile('./__DEV/cyrpto_compare_data.json'));
	}

	return new Promise( (resolve, reject) => {
		request('https://min-api.cryptocompare.com/data/all/coinlist', (error, response, body) => {
			if (!error && response.statusCode === 200) {
				resolve(body);
			} else {
				reject(Error(error));
			}
		});
	});
}

module.exports = cryptoCompareApi;