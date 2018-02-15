const config = require('../config/config');
const { Pool } = require('pg');

const db = {};

db.pool = new Pool(config.db);

module.exports = db;


