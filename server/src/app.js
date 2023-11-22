require('dotenv').config();
const compression = require('compression');
const express = require('express');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const app = express();
const path = require('path');
const cors = require('cors');
const { createBulkHanhChinh } = require('./services/hanhChinh.service');

app.use(cors());

app.use(express.static(path.join(process.cwd(), '../client/dist')));

app.get('/', function (req, res) {
	res.sendFile(path.join(process.cwd(), '../client/dist/index.html'));
});
// init middlewares

/**
 * Log formatter when there is request
 */
app.use(morgan('dev'));
// morgan('combined')
// morgan('common')
// morgan('short')
// morgan('tiny')

/**
 * Prevent others access to server type and secret informations
 * Example(without helmet): curl http://localhost:3055 --include
 * Res: HTTP/1.1 200 OK
      X-Powered-By: Express
      Content-Type: application/json; charset=utf-8
      Content-Length: 41
      ETag: W/"29-HhJxgDb/gUpY0GQiR5Hxbit5IZE"
      Date: Sat, 25 Mar 2023 17:04:34 GMT
      Connection: keep-alive
      Keep-Alive: timeout=5
 */
app.use(helmet());

/**
 * Compress big tranfer data
 */
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init db
require('./dbs/init.mongodb');
// const { checkOverload } = require('./helpers/check.connect');
// checkOverload();

app.use('/', require('./routes'));

// Create all collections of Hanh Chinh VietNam
createBulkHanhChinh();

// handling errors
app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	const statusCode = error.status || 500;
	return res.status(statusCode).json({
		status: 'error',
		code: statusCode,
		stack: error.stack, // stack trace for dev env
		message: error.message || 'Internal Server Error',
	});
});

module.exports = app;
