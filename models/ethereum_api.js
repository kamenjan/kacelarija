let asyncFs = require('../utils/async_fs');
let _ = require('lodash');

let request = require('request');
let exchange_m = require('../models/exchange_model');

let ethereumApi = {};

ethereumApi.getBalance = async () => {

	let keyPair = await exchange_m.getApiKey('4b7a3452-6a76-4ee8-9c0a-184c994f9a0a', 'ethplorer');

	let apiResponse = await _accountBalance(keyPair.key, keyPair.address, true);
	/* Write to file for development purposes */
	// await asyncFs.writeFile('./__DEV/ethereum_account.json', JSON.stringify(balance));

	/* Parse ether balance */
	let balance = [
		{
			Source: 'ethereum blockchain',
			Currency: 'ETH',
			Balance: parseFloat(apiResponse.ETH.balance).toFixed(8),
			Available: parseFloat(apiResponse.ETH.balance).toFixed(8)
		},
	];

	/* Parse token balance */
	apiResponse.tokens.forEach( token => {
		if (token.tokenInfo.price) {
			balance.push({
				Source: 'ethereum blockchain',
				Currency: token.tokenInfo.symbol,
				Balance: (token.balance / Math.pow(10, parseInt(token.tokenInfo.decimals))).toFixed(8),
				Available: (token.balance / Math.pow(10, parseInt(token.tokenInfo.decimals))).toFixed(8)
			});
		}
	});
	return balance;
};

async function _accountBalance (key, address, readFromFile = false) {

	if (readFromFile) {
		return JSON.parse(await asyncFs.readFile('./__DEV/ethereum_account.json'));
	}

	return new Promise( (resolve, reject) => {
		request(`https://api.ethplorer.io/getAddressInfo/${address}?apiKey=${key}`, (error, response, body) => {
			if (!error && response.statusCode === 200) {
				resolve(JSON.parse(body));
			} else {
				reject(Error(error));
			}
		});
	});
}

module.exports = ethereumApi;