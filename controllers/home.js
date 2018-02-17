let express = require('express');
let router = express.Router();

let asyncFs = require('../utils/async_fs');
let _ = require('lodash');

/* Awesome package for making routes async functions: https://www.npmjs.com/package/express-async-handler */
const asyncHandler = require('express-async-handler');
const authMiddleware = require('../middleware/auth');

/* GET home page. */
router.get('/', authMiddleware, asyncHandler(async (req, res) => {

	let balance = await updateBalance();

	res.render('home', {
		session: req.session,
		balance: balance
	})
}));

const bittrexApi = require('../models/bittrex_api');
const binanceApi = require('../models/binance_api');
const bitstampApi = require('../models/bitstamp_api');

async function updateBalance () {

	let binance = await binanceApi.getNonZeroBalances();
	let bittrex = await bittrexApi.getNonZeroBalances();
	let bitstamp = await bitstampApi.getNonZeroBalances();

	let merged = _.merge(binance, bittrex, bitstamp);

	return merged;

}

module.exports = router;