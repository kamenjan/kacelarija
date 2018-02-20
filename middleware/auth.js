/* Authentication middleware function that checks users session cookie for  *
 * loggedin value. This value gets set in freshly baked session cookie when *
 * user successfully logins in */
module.exports = function(req, res, next) {
	/* Check if cookie/session is set and value loggedin is TRUE */
	req.session.loggedin ? next() : res.redirect('/login');
};