var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 导入cors代理
var cors = require('cors')
// 导入body-parser 解析器
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// 导入配置路由
const wallRouter = require('./routes/walls')

var app = express();

// 全局挂载cors
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// parse application/x-www-form-urlencoded
// 当 extended 为false时，值为数组或者字符串，当为true时，值可以为任意类型
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
// 用于处理json格式
app.use(bodyParser.json())


// 注册路由
app.use('/wall', wallRouter)


app.use('/', indexRouter);
app.use('/users', usersRouter);

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
