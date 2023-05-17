var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var PORT = 3001;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



//mongoose, mongoDBsa
var mongoose = require("mongoose");
var mongoDB = "mongodb+srv://admin:admin@cluster0.infym86.mongodb.net/stackOverflow";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
var session = require("express-session");
app.use(session({
  secret: "work hard",
  resave: true,
  saveUninitialized: false
}));

db.on("error", console.error.bind(console, "mongoDB connection is pupšit"));

var usersRouter = require("./routes/userRoutes");
app.use("/users", usersRouter);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.listen(PORT, () => {
  console.log(`API ALIVE AND GOOD ON http://localhost:${PORT}`)
});

// catch 404 and forward to error handler
