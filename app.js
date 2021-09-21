var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
var logger = require('morgan');

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/wallet');
var balance = require('./routes/newaccount');

var app = express();

app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API

app.set('trust proxy', 1);

// const limiter = rateLimit({
//   max: 5, // 5 requests per windowMs 
//   windowMs: 5 * 60 * 1000,
//   message: "✋🏼Hold on! You've consumed fair request limit, please try again after 5 minutes!"
// });
// app.use(limiter);

// Data sanitization against XSS
app.use(xss());

app.use('/', indexRouter);
app.use('/balance', usersRouter);
app.use('/transfer', usersRouter);
app.use('/createaccount', balance)

app.all('*', (req, res, next) => {

  next(new AppError(`Cannot find ${req.originalUrl} on this server !`, 404));

});

app.use(globalErrorHandler);


module.exports = app;
