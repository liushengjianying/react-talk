// mongoose 的库
const mongoose = require('mongoose')
// 1.链接mongo, 并且使用imooc这个集合，没有的话会自动新建
const DB_URL = 'mongodb://localhost:27017/imooc-chat'
mongoose.connect(DB_URL, {useNewUrlParser: true })
mongoose.connection.on('connected', function () {
    console.log('mongo connect success')
});

const models = {
    user: {
        'user': {type: String, 'require': true},
        'pwd': {type: String, 'require': true},
        'type': {'type': String, 'require': true},
        //头像
        'avatar': {'type': String},
        // 个人简介或者职位简介
        'desc': {'type': String},
        // 职位名
        'title': {'type': String},
        // 如果你是boss 还有两个字段
        'company': {'type': String},
        'money': {'type': String}
    },
    chat: {
        'chatid': {type: String, require: true},
        'read': {type: Boolean, default: false},
        'from': {type: String, require: true},
        'to': {type: String, require:true},
        'Content': {type: String, require: true, default: ''},
        'create_time': {type: Number, default: new Date().getTime()}
    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
}