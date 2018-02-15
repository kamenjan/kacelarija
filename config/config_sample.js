const path = require('path');

const config = {
	salt : "long-ass-random-alphanumeric-string",
	db : {
		user: 'user',
		host: 'host',
		database: "db_name",
		password: 'password',
		port: 3333
	},
	session : {
		name: 'session',
		keys: ["long-random-alphanumeric-string"],
		maxAge: 24 * 60 * 60 * 1000
	},
	path : {
		appRoot: path.join(__dirname, '..'),
		nodeModules: path.join(__dirname, '..', 'node_modules'),
		public: path.join(__dirname, '..', 'public')
	}
};

module.exports = config;