// import express from 'express'
const express = require('express');
const app = express();
//post请求，服务器端要用body-parser插件
 const bodyParser = require('body-parser')
// 解析cookie的插件
const cookieParser = require('cookie-parser')
const model = require('./model')
const Chat = model.getModel('chat');
const path = require('path');
// socket.io work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

// Chat.remove({}, function (e, d) {})

// socket是当次的链接，io指的是全局链接
        io.on('connection', function (socket) {
            // console.log('爆炸神拳')
            socket.on('sendmsg', function (data) {
                console.log(data)
                // io.emit('receiveMsg', data)
                const {from, to, msg} = data
                const chatid = [from, to].sort().join('_')
                Chat.create({chatid, from, to, Content: msg}, function (err, doc) {
                    console.log(doc._doc)
                    io.emit('recvmsg', doc)
                })
    })
})

// 类似于mysql的表，mongo里面有文档，字段的概念
// 这里文档名字为user(key的概念),值为这个新建的对象
// const User = mongoose.model('user', new mongoose.Schema({
//     user: {type: String, require: true},
//     age: {type: Number, require: true}
// }))

// 新增数据,参数err表示有没有出错，异步执行
// User.create({
//     user: 'xiaohua',
//     age: 12
// }, function (err, doc) {
//     if (!err) {
//         console.log(doc)
//     } else {
//         console.log(err)
//     }
// })

//删除数据

// User.remove({age: 18}, function (err, doc) {
//     console.log(doc)
// })

// 更新数据
// User.update({'user': 'xiaohua'}, {'$set': {age: 26}}, function (err, doc) {
//     console.log(doc)
// })

//
// app.get('/data', (req, res) => {
//     // {}传入空，查找所有
//     User.findOne({user: 'xiaohua'}, function (err, doc) {
//         return res.json(doc)
//     })
//     // res.json({name: 'imooc aaaa', type: 'get'})
// })

// app.get('/', function(req, res) {
//     var url = ......
//
//     axios.get(url, {
//         header: {
//
//         }
//     }).then(response)=> {
//         res.json(response.data)
//     }
// })


// app.listen(9093, function () {
//     console.log('node app start')
// })
const userRouter = require('./user')

// 接受post过来的参数
app.use(cookieParser());
app.use(bodyParser.json());
// 使用user中的路由中间件,访问路由后先访问到user
app.use('/user', userRouter);
app.use(function(req, res, next) {
   if (req.url.startsWith('/user/') || req.url.startsWith('/static/')) {
       next()
   }
   console.log(path.resolve('build/index.html'))
   return res.sendFile(path.resolve('build/index.html'));
});
app.use('/', express.static(path.resolve('build')));
server.listen(9093, function () {
    console.log('node app start')
})