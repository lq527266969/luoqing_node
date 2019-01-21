const path = require('path')

const MongoClient = require('mongodb').MongoClient;


const captchapng = require('captchapng')

// var session = require('express-session')
const url = 'mongodb://localhost:27017';



// Database Name
const dbName = 'szhmqd27';
//注册页面
exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/register.html'))

}

//注册请求
exports.register = (req, res) => {
    const result = {
        status: 0,
        message: '注册成功'
    }
    const {
        username
    } = req.body


    MongoClient.connect(url, function (err, client) {
        //拿到db
        const db = client.db(dbName);
        //拿到集合
        const collection = db.collection('registerInfo')
        //查询一个
        collection.findOne({
            username
        }, (err, doc) => {
            //如果doc==null,说明没有注册,可以插入,如果有,则已经被注册
            if (doc) {
                //存在
                result.status = 1
                result.message = "用户名已存在"
                //关闭数据库
                client.close();
                //返回
                res.json(result)
            } else {
                //如果用户名不存在,则插入数据库
                //reslut2有值,代表成功 result2为null就是失败    
                collection.insertOne(req.body, (err, result2) => {
                    if (!result2) {
                        //失败
                        result.status = 2;
                        result.message = '注册失败'
                    }
                    //关闭数据库
                    client.close();
                    //返回
                    res.json(result)
                })
            }
        })
    });
}

//导出获取登录页面的方法
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/login.html'))
}

//导出验证码方法
exports.getVcodeImg = (req, res) => {
    const vcode = parseInt(Math.random() * 9000 + 1000)
    // console.log(vcode);

    req.session.vcode = vcode


    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 =Buffer.from(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}
//导出方法
exports.login = (req, res) => {
    const result = {
        status: 0,
        message: '登录成功'
    }
    const { username,password,vcode} = req.body
    console.log(req.body.vcode)
    if (req.session.vcode != vcode) {
        result.status = 1
        result.message = '验证码错误'

        res.json(result)
        return false
    }
    MongoClient.connect(url,{useNewUrlParser:true}, function (err, client) {

        console.log(username);
        console.log(password);
        console.log('---------------------------------------');
        
        const db = client.db(dbName);
        const collection = db.collection('registerInfo');

        collection.findOne({username,password},(err, doc) => {
            console.log(doc);
            console.log('---------------------------------------');

            if (!doc) {
                result.status = 2;
                result.message = '用户名密码错误'
                
                res.json(result)
                
                console.log(1111);
                client.close();
                return
            }else {
                console.log(222);
                
                client.close();
                res.json(result)
            }
           
        })
       
    });
}