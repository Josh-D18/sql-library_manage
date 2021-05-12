var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const { sequelize } = require('./models/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('static', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  const error = new Error();
  error.status = 404;
  error.message = "Sorry Page Not Found!";
  res.render('page_not_found', { error })
})

// Global Error Handler
app.use((err, req, res, next) => {
  err.status = 500;
  err.message = 'Oops something went wrong!';
  console.error(err.status)
  console.error(err.message)
  res.render('error', { err })
})


sequelize.authenticate()
  .then(() => {
    console.log('Connected');
  }).catch(err => {
    console.error("Error can't connect", err)
  })

sequelize.sync()



module.exports = app;
