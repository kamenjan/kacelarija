const db = require('../utils/db');
const crypto = require('../utils/crypto');

let exchange = {};

exchange.getBalance = async (exchange) => {
	const query = `SELECT uid, username FROM users WHERE username ='${userName}' AND password ='${hashPassword}'`;

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
};

exchange.login = async function() {

};

module.exports = exchange;

