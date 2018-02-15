let express = require('express');
let router = express.Router();

let user_m = require('../models/user_model');

/* GET login page. */
router.get('/login', function (req, res) {
	res.render('login', {
		session: req.session
	});
});

router.post('/login', function (req, res) {

	let username = req.body.username;
	let password = req.body.password;

	user_m.login(username, password).then((response) => {

		if (response) {
			req.session.uid = response.uid;
			req.session.loggedin = true;
			res.redirect('/');
		} else {
			res.render('login', {
				session: req.session
			});
		}
	}).catch((err) => {

	});
});

router.get('/logout', function (req, res) {
	req.session = null;
	res.redirect('/');
});

module.exports = router;