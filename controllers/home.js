let express = require('express');
let router = express.Router();

let asyncFs = require('../utils/async_fs');
// let _ = require('lodash');

/* Awesome package for making routes async functions: https://www.npmjs.com/package/express-async-handler */
const asyncHandler = require('express-async-handler');
const authMiddleware = require('../middleware/auth');

/* GET home page. */
router.get('/', authMiddleware, asyncHandler(async (req, res) => {

	// let market;
	//
	// try {
	// 	market = await asyncFs.readFile('./__DEV/balance.json');
	// } catch(err) {
	// 	console.log('error: ' + err.stack);
	// 	return err;
	// }
	//
	// market = JSON.parse(market);
	//
	// let balance = market.result.filter( (ticker) => {
	// 	return ticker.Balance > 0;
	// }).map( (ticker) => {
	// 	ticker.Balance = (ticker.Balance).toFixed(8);
	// 	ticker.Available = (ticker.Available).toFixed(8);
	// 	return ticker;
	// });
	//
	// console.log(market);

	let balance = await updateBalance();

	console.log(balance);

	res.render('dev', {
		session: req.session,
		balance: balance
	})
}));

// function updateBalance
const bittrexApi = require('../models/bittrex_api');
const binanceApi = require('../models/binance_api');

async function updateBalance () {
	return binanceApi.getNonZeroBalances();
	// return bittrexApi.getNonZeroBalances();
}

module.exports = router;