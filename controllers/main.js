let express = require('express');
let router = express.Router();


router.use('/', require('./dev'));

// router.use('/', require('./login'));
// router.use('/', require('./home'));

module.exports = router;
