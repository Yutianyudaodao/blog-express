1.“中间件栈”处理流 
2.路由
3.对 request 和 response 对象方法进行了拓展
4.视图层，模板引擎


入口文件：bin/www

var express = require('express');
var app = express();

路由地址会接着use时的地址
app.use('/', indexRouter);
var router = express.Router();
router.get('./list',(req,res,next)=>{
  req.query
})
router.post('./new',middleware,(req,res,next)=>{
  req.body
})
middleware中一定要调用next()
response.redirect("/hello/world")：重定向
response.sendFile("path/to/cool_song.mp3")：发送文件

一些中间件：
express.static :极大压缩静态文件的代码量
connect-ratelimit：控制每小时的连接数
cookie-parser：解析浏览器中的 cookie 信息


app接收路由地址 -->
进入对应路由文件 -->
路由文件请求数据，进入controller层 -->
controller层调用数据库config文件针对不同的行为对数据库进行增删改查-->
config文件引用环境配置连接数据库

页面请求地址-->进入路由-->操作数据库,拿到数据返回-->连接数据库-->环境配置