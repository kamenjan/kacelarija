const crypto = require('crypto');

const generateSHA256 = (data) => crypto.createHash('sha256').update(data).digest('base64');

module.exports = {
	generateSHA256
};