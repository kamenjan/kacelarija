/* package.json config file */
const package = require('./package');

const express = require('express');
const app = express();

const path = require('path');

const env = app.get('env');

app.set('config', require('./config/config.js'));

app.use(express.static(path.join(__dirname, 'public/dist'), {
	extensions: ['htm', 'html', 'map']
}));

/* TODO: Do some techy magic on port configuration */
let port = '3000';
app.set('port', port);

const server = app.listen(port);

switch (env) {
	case 'development':
		let logger = require('morgan');
		app.use(logger('dev'));
		/* https://expressjs.com/en/guide/behind-proxies.html */
		// app.set('trust proxy', 'loopback');
		break;
	case 'production':
		/* https://expressjs.com/en/guide/behind-proxies.html */
		// app.set('trust proxy', 1); // trust first proxy
		/* Proxy is secured, localhost is not */
		// app.get('config').session.cookie.secure = true;
		break;
	default:
		// TODO: If env is not set quit gracefuly (mind: nodemon is running in development ??)
		// console.log('env not set');
}

/* Set up npm middleware for parsing post request bodies */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* Define application session cookie and settings */
const cookieSession = require("cookie-session");
app.use(cookieSession(app.get('config').session));


/* View engine and views path setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* Define local variables to be used by views and templates */
app.locals.title = 'Kancelarija';

/* And of we go ... */
app.use(require('./controllers/main'));

/* Catch 404 and forward to error handler */
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* Development error handler [show stacktrace = TRUE] */
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

/* Production error handler [show stacktrace = FALSE] */
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;