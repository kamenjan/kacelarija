const db = require('../utils/db');

let exchange_m = {};

exchange_m.getApiKey = async function(uid, exchange) {

	const query = `SELECT key, secret, address FROM keys WHERE uid ='${uid}' AND name ='${exchange}'`;

	let dbResponse;

	try {
		dbResponse = await db.pool.query(query);
	} catch(err) {
		console.log('error: ' + err.stack);
		return err;
	}

	if (dbResponse.rowCount !== 0) {
		return dbResponse.rows[0];
	} else {
		return false;
	}
};



module.exports = exchange_m;

