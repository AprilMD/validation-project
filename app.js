//the server and all the express stuff is dont in app.js

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var nunjucks = require('nunjucks');
const expressSession = require('express-session')

var config = require('./config.js');
var utils = require('./utils.js');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
nunjucks.configure([
  "node_modules/govuk-frontend/",
  "views"
], {
  autoescape: true,
  express: app
});

// add variables that are available in all views
app.locals.serviceName = config.serviceName

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // this makes it so that only the public folder can serve static content

app.use('/assets', express.static(path.join(__dirname, '/node_modules/govuk-frontend/govuk/assets')))

// Session data in memory
app.use(expressSession({
  secret: 'SpaceCats',
  cookie: {
    maxAge: 1000 * 60 * 60 * 4,
    secure: false
  },
  name: 'SpaceCats',
  resave: false,
  saveUninitialized: false
}));
app.use(utils.autoStoreData);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
