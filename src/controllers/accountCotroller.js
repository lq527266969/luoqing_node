const path = require('path')

const databasetool = require(path.join(__dirname,'../tools/datbasetools'))

const captchapng = require('captchapng')
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

    databasetool.findYige('registerInfo',{username},(err,doc)=>{
        if (doc) {
            //存在
            result.status = 1
            result.message = "用户名已存在"
            //返回
            res.json(result)
        }else{
            databasetool.insertSingle('registerInfo',req.body,(err,result2)=>{
                if (!result2) {
                    //失败
                    result.status = 2;
                    result.message = '注册失败'
                }
                res.json(result)
            })
        }
    })
}

//导出获取登录页面的方法
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/login.html'))
}

//导出验证码方法
exports.getVcodeImg = (req, res) => {
    const vcode = parseInt(Math.random() * 9000 + 1000)
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
    if (req.session.vcode != vcode) {
        result.status = 1
        result.message = '验证码错误'

        res.json(result)
        return false
    }
    databasetool.findYige('registerInfo',{username,password},(err,doc)=>{
        if (!doc) {
            result.status = 2;
            result.message = '用户名密码错误'
        }else{
            req.session.loginedName = username;
            // console.log(req.session.loginedName);
        }

        res.json(result)
    })

}
exports.loginOut= (req,res)=>{
    req.session.loginedName = null;
    res.send(`<script>location='/account/login'</script>`)
}