let express = require('express');
let router = express.Router();

let authMiddleware = require('../middleware/auth');

/* GET home page. */
router.get('/', authMiddleware, function(req, res) {
	res.render('home', {
		session: req.session
	});
});

module.exports = router;