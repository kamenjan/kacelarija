let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	console.log(req.session);
	res.locals.name = 'stranger';
	res.render('home');
});

module.exports = router;