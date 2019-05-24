const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const bodyParser = require('body-parser') // post请求解析工具
const utils = require('utility') // 密码md5加密工具
const _filter = {'pwd': 0, '__v': 0}
const _filtered = {'_id': 0}
const cookieParser = require('cookie-parser')

Router.use(bodyParser.json())
Router.use(cookieParser())

Router.get('/list', function (req, res) {
    const {type} = req.query
    // 清空所有代码
    // User.remove({}, function (err, doc) {})

    // 如果传入空，查询所有,mongodb
    User.find({type}, function (err, doc) {
        return res.json({code: 0, data: doc})
    })
})

Router.post('/login', function (req, res) {
    const {user, pwd} = req.body
    // 第一个是查询条件，第二个是显示条件 这里不显示pwd
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
        if (!doc) {
            return res.json({code: 1, msg: '用户名不存在或者密码错误'})
        }
        res.cookie('userid', doc._id)
        return res.json({code: 0, data: doc})
    })
})

Router.post('/register', function (req, res) {
    console.log(req.body)
    const {user, pwd, type} = req.body
    User.findOne({user}, function (err, doc) {
        console.log('doc:', doc)
        if (doc) {
            return res.json({code: 1, msg: '用户名重复'})
        }
        const userModel = new User({user, type, pwd: md5Pwd(pwd)})
        userModel.save(function (err, doc) {
            if (err) {
                return res.json({code: 1, msg: '后端出错了'})
            }
            const {user, type, _id} = doc
            res.cookie('userid', _id)
            return res.json({code: 0, data: {user, type, _id}})
        })
        // 换个save的写法，save只针对当前实例，create可以同时保存一组文档，我也不知道本质的区别
        // User.create({user, type, pwd: md5Pwd(pwd)}, function(err, doc) {
        //     if (err) {
        //         return res.json({code: 1, msg:'后端出错了'})
        //     }
        //     return res.json({code: 0})
        // })
    })
})

Router.post('/update',function(req,res) {
    const userid = req.cookies.userid
    // const {userid} = req.cookies
    // 登录后没有cookie的情况，比如一个页面登录了，一个页面注销了，总之注销后就没有cookie的情况，所以还是要校验cookie
    if (!userid) {
        return res.json({code: 1})
    }
    const body = req.body
    // 此方法第一个参数是一个id， 第二个是要更新的数据
    User.findByIdAndUpdate(userid, body, function (err, doc) {
        // node没有babel，没法用es6的展开符...
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type,
            pwd: doc.pwd
        },body)
        return res.json({code:0, data})
    })
})

// Router.post('/update',function(req,res){
//     const userid = req.cookies.userid
//     if (!userid) {
//         return res.json({code:1})
//     }
//     const body = req.body
//     User.findByIdAndUpdate(userid,body,function(err,doc){
//         const data = Object.assign({},{
//             user:doc.user,
//             type:doc.type
//         },body)
//         return res.json({code:0,data})
//     })
// })

Router.get('/info', function(req, res) {
    const {userid} = req.cookies
    if (!userid) {
        // 用户有没有cookie
        return res.json({code: 1})
    }
    User.findOne({_id: userid}, _filter, function (err, doc) {
        if (err) {
            return res.json({code: 1, msg: '后端出错了'})
        }
        if (doc) {
            return res.json({code: 0, data: doc})
        }
    })
})

Router.get('/getMsgList', function (req, res) {
    const user = req.cookies.userid
    User.find({}, function (err, userDoc) {
        let users = {}
        userDoc.forEach(v => {
            users[v._id] = {name: v.user, avatar: v.avatar}
        })
        Chat.find({'$or':[{from: user}, {to: user}]}, function (err, doc) {
            if (!err) {
                return res.json({code: 0, msgs: doc, users: users})
            }
        })
    })
})

Router.post('/readmsg', function(req, res){
    const userid = req.cookies.userid
    const {from} = req.body
    Chat.update(
        {from,to:userid},
        {'$set':{read:true}},
        {'multi':true},
        function(err,doc){
            console.log(doc)
            if (!err) {
                return res.json({code:0,num:doc.nModified})
            }
            return res.json({code:1,msg:'修改失败'})
        })
})

function md5Pwd(pwd) {
    const salt = 'react_is_awesome_17216361ussa!@dsa~'
    return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router