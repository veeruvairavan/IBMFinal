var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var projectTaskRouter =  require('./routes/projectTask');
var taskRouter = require('./routes/Tasks');

var app = express();
var cors = require('cors');

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/project',projectTaskRouter);
app.use('/task',taskRouter);


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
var mongoose = require('mongoose');

async function connectDB(){
  console.log("connecting to DB");
  // Connect to the server
 await mongoose.connect('mongodb://localhost:27017/fsddb');
  // When the mongodb server goes down, mongoose emits a 'disconnected' event
  mongoose.connection.on('disconnected', () => { console.log('-> lost connection'); });
  // The driver tries to automatically reconnect by default, so when the
  // server starts the driver will reconnect and emit a 'reconnect' event.
  mongoose.connection.on('reconnect', () => { console.log('-> reconnected'); });

  // Mongoose will also emit a 'connected' event along with 'reconnect'. These
  // events are interchangeable.
  mongoose.connection.on('connected', () => { console.log('-> connected'); });
};


connectDB();

module.exports = app;
