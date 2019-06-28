var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var path = require('path');
var fs = require('fs')
// const RedisStore = require('connect-redis')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');
var app = express();

// view engine setup 前端页面
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


const ENV = process.env.NODE_ENV;
if(ENV !== 'production'){
  app.use(logger('dev'));
}else{
  const logFileName = path.join(__dirname,'logs','access.log');
  const wirteStream = fs.createWriteStream(logFileName,{
    flags:'a'
  })
  app.use(logger('combined',{
    stream:wirteStream
  }))
}

app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: false })); //做除了json格式之外的数据req.body
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// const redisClient = require('./db/redis');
// const sessionStore = new RedisStore({
//   client: redisClient
// })
app.use(session({
  secret:'OIkn0_86g#', //密匙
  cookie: {
    // path: '/', //默认
    // httpOnly: true, //默认
    maxAge: 24*60*60*1000, //过期时间
  }
  // store: sessionStore
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'env' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
