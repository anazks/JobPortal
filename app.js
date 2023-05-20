const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require("handlebars")

const connectDB = require("./db/connection");
require("dotenv").config();
const session = require("express-session");
const fileUpload = require("express-fileupload")

const indexRouter = require('./routes/index');
const companyRouter = require("./routes/company")

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
//iff helper to perform the normal if condition with two operands
hbs.registerHelper('iff', function (a, operator, b, opts) {
  var bool = false;
  switch (operator) {
    case '==':
      bool = a == b;
      break;
    case '>':
      bool = a > b;
      break;
    case '<':
      bool = a < b;
      break;
    default:
      throw "Unknown operator " + operator;
  }
  if (bool) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 } //max age 1 hour
}))

async function connect() {
  try {
    let url = process.env.MONGO_URI; //connectionn string from .env file
    await connectDB("mongodb+srv://anazks:123@cluster0.jxpil.mongodb.net/betaPortal?retryWrites=true&w=majority");
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
}
connect();

app.use('/', indexRouter);
app.use("/company", companyRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

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
