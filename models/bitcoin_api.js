let asyncFs = require('../utils/async_fs');
let _ = require('lodash');

let request = require('request');
let exchange_m = require('../models/exchange_model');

let bitcoinApi = {};

bitcoinApi.getBalance = async () => {

	// let keyPair = await exchange_m.getApiKey('4b7a3452-6a76-4ee8-9c0a-184c994f9a0a', 'bitcoin blockchain');

	let apiResponse = await _accountBalance();
	/* Write to file for development purposes */
	// await asyncFs.writeFile('./__DEV/bitcoin_test.json', JSON.stringify(apiResponse));

	/* Parse and return API response */
	// return parsedApiresponse;

};

/* TODO: Does not work. Strange behaviour - nano s ledger XPUB key returns zero value. Other XPUB keys seem to work fine */
// https://bitcoin.stackexchange.com/questions/60565/is-it-possible-to-use-xpub-address-to-monitor-balance-from-previously-generated
async function _accountBalance (readFromFile = false) {

	if (readFromFile) {
		return JSON.parse(await asyncFs.readFile('./__DEV/ethereum_account.json'));
	}

	// random XPUB address
	let address = 'xpub6CUGRUonZSQ4TWtTMmzXdrXDtypWKiKrhko4egpiMZbpiaQL2jkwSB1icqYh2cfDfVxdx4df189oLKnC5fSwqPfgyP3hooxujYzAu3fDVmz';

	// for cmd testing:
	// curl https://blockchain.info/multiaddr?active=xpub6CUGRUonZSQ4TWtTMmzXdrXDtypWKiKrhko4egpiMZbpiaQL2jkwSB1icqYh2cfDfVxdx4df189oLKnC5fSwqPfgyP3hooxujYzAu3fDVmz

	return new Promise( (resolve, reject) => {
		request.post({
				url: `https://api.blockcypher.com/v1/btc/main/wallets/hd?token=${token}`,
				method: 'POST',
				json: {
					name: "My account",
					extended_public_key: address
				}
			}, (err, httpResponse, body) => {
				if (err) {
					reject(Error(err));
				} else {
					resolve(body);
				}
			}
		);
	});
}

module.exports = bitcoinApi;