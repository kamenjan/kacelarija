let express = require('express');
let router = express.Router();

let _ = require('lodash');

/* Awesome package for making routes async functions: https://www.npmjs.com/package/express-async-handler */
const asyncHandler = require('express-async-handler');
const authMiddleware = require('../middleware/auth');

/* GET home page. */
router.get('/', authMiddleware, asyncHandler(async (req, res) => {

	let balance = await updateBalance();

	let totalBTC = balance.map( ticker => {
		return parseFloat(ticker.total_btc)
	}).reduce((total, value) => {
		return total + value;
	});

	let totalUSD = balance.map( ticker => {
		return parseFloat(ticker.total_usd);
	}).reduce((total, value) => {
		return total + value;
	});

	console.log(totalBTC);
	console.log(totalUSD);

	res.render('home', {
		session: req.session,
		balance: balance,
		total: {
			btc: totalBTC,
			usd: totalUSD
		}
	})
}));

const bittrexApi = require('../models/bittrex_api');
const binanceApi = require('../models/binance_api');
const bitstampApi = require('../models/bitstamp_api');
const cryptoCompareApi = require('../models/cryptocompare_api');
const coinMarketCapApi = require('../models/coinmarketcap_api');

async function updateBalance () {

	let binance = await binanceApi.getNonZeroBalances();
	let bittrex = await bittrexApi.getNonZeroBalances();
	let bitstamp = await bitstampApi.getNonZeroBalances();

	/* No price included - will I need this? */
	// let coinsData = await cryptoCompareApi.getCoinsData();
	/* Using coinmarketcap API instead */
	let coinsData = await coinMarketCapApi.getCoinsData();

	let merged = _.merge(binance, bittrex, bitstamp);

	return coinsData.filter( ticker => {
		return _.find(merged, { 'Currency': ticker.symbol });
	}).map( ticker => {
		let coinBalance = _.find(merged, { 'Currency': ticker.symbol });
		ticker.balance = coinBalance.Balance;
		ticker.available = coinBalance.Available;
		ticker.source = coinBalance.Exchange;

		ticker.price_btc = parseFloat(ticker.price_btc).toFixed(8);
		ticker.total_btc = (coinBalance.Balance * ticker.price_btc).toFixed(8);
		ticker.price_usd = parseFloat(ticker.price_usd).toFixed(2);
		ticker.total_usd = (coinBalance.Balance * ticker.price_usd).toFixed(2);
		return ticker;
	});

}

module.exports = router;