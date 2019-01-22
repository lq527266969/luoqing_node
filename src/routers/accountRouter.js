const express = require('express')

const path = require('path')

//创建路由对象
const accountRouter = express.Router()

//导入控制器模块

const accountController = require(path.join(__dirname,"../controllers/accountCotroller.js"))

//获取注册页面的请求

accountRouter.get('/register',accountController.getRegisterPage)

//获取注册

accountRouter.post('/register',accountController.register)


//获取登录

accountRouter.get('/login',accountController.getLoginPage)

//获取验证码
accountRouter.get('/vcode',accountController.getVcodeImg)

//登录操作
accountRouter.post('/login',accountController.login)

//注销操作
accountRouter.get('/loginOut',accountController.loginOut)


//导出
module.exports = accountRouter


