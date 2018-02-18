let express = require('express');
let router = express.Router();

let _ = require('lodash');

/* Awesome package for making routes async functions: https://www.npmjs.com/package/express-async-handler */
const asyncHandler = require('express-async-handler');
const authMiddleware = require('../middleware/auth');

/* GET home page. */
router.get('/', authMiddleware, asyncHandler(async (req, res) => {

	let balance = await updateBalance();
	let totalBTC = balance.map( ticker => parseFloat(ticker.TotalBTC) ).reduce( (total, value) => total + value );
	let totalUSD = balance.map( ticker => parseFloat(ticker.TotalUSD) ).reduce( (total, value) => total + value );

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
const ethereumApi = require('../models/ethereum_api');

// const cryptoCompareApi = require('../models/cryptocompare_api');
const coinMarketCapApi = require('../models/coinmarketcap_api');

async function updateBalance () {

	let binance = await binanceApi.getNonZeroBalances();
	let bittrex = await bittrexApi.getNonZeroBalances();
	let bitstamp = await bitstampApi.getNonZeroBalances();
	let ethereum = await ethereumApi.getBalance();

	/* No price included - will I need this? */
	// let coinsData = await cryptoCompareApi.getCoinsData();
	/* Using coinmarketcap API instead TODO: remove cryptoCompare library */
	let coinsData = await coinMarketCapApi.getCoinsData();

	let merged = binance.concat(bittrex, bitstamp, ethereum);

	merged.forEach( (exchangeCoin, index) => {
		let coinPublicData = coinsData.find( element => element.symbol === exchangeCoin.Currency );
		merged[index].PriceBTC = parseFloat(coinPublicData.price_btc).toFixed(8);
		merged[index].TotalBTC = parseFloat(merged[index].Balance * coinPublicData.price_btc).toFixed(8);
		merged[index].PriceUSD = parseFloat(coinPublicData.price_usd).toFixed(2);
		merged[index].TotalUSD = parseFloat(merged[index].Balance * coinPublicData.price_usd).toFixed(2);
	});

	return merged;
}

module.exports = router;