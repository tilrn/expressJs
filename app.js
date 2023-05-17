var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var PORT = 3001;
var usersRouter = require("./routes/usersRoutes");
var questionsRouter = require("./routes/questionsRoutes");
var commentsRouter = require("./routes/commentsRoutes");


var app = express();

var session = require("express-session");
app.use(session({
  secret: "work hard",
  resave: true,
  saveUninitialized: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/users", usersRouter);
app.use("/questions", questionsRouter);
app.use("/comments", commentsRouter);






//mongoose, mongoDBsa
var mongoose = require("mongoose");
var mongoDB = "mongodb+srv://admin:admin@cluster0.infym86.mongodb.net/stackOverflow";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;


db.on("error", console.error.bind(console, "mongoDB connection is pupšit"));



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
