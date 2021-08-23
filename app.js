var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/wallet');
var balance = require('./routes/newaccount');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/balance', usersRouter);
app.use('/transfer', usersRouter);
app.use('/createaccount', balance)

app.all('*', (req, res, next) => {

  next(new AppError(`Cannot find ${req.originalUrl} on this server !`, 404));

});

app.use(globalErrorHandler);


module.exports = app;
