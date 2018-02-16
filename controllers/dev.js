/* TODO: Delete this comment; testing git user config */

let express = require('express');
let router = express.Router();

let asyncFs = require('../utils/async_fs');
let _ = require('lodash');

/* Awesome package for making routes async functions: https://www.npmjs.com/package/express-async-handler */
const asyncHandler = require('express-async-handler');
const db = require('../utils/db');

router.get('/', asyncHandler(async (req, res, next) => {

	let keyPair = await getKey('283a2ce8-21dc-47e4-b0cd-f5cc6fea8e1b');

	// let market = await getMarket(keyPair.key, keyPair.secret);
	// await asyncFs.writeFile('./__DEV/balance.json', JSON.stringify(market));

	let market = await asyncFs.readFile('./__DEV/balance.json');
	market = JSON.parse(market);

	let positiveBalance = market.result.filter( ticker => ticker.Balance > 0 );

	res.render('dev', {
		balance: positiveBalance
	})

}));

async function getKey(id) {
	const query = `SELECT key, secret FROM keys WHERE id ='${id}'`;

	try {
		const res = await db.pool.query(query);
		if (res.rowCount !== 0) {
			return res.rows[0];
		} else {
			return false;
		}

	} catch(err) {
		console.log('error: ' + err.stack);
		return err;
	}
}

function getMarket(key, secret) {

	let bittrex = require('node-bittrex-api');

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

module.exports = router;