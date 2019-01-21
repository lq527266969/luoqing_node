const express = require('express')

const path = require('path')


//创建路由分支

const studentRouter = express.Router()

//导入控制器模块

const studentController = require(path.join(__dirname,"../controllers/studentCotroller.js"))

//请求对象

studentRouter.get('/list',studentController.getStudentPage)

//导出

module.exports = studentRouter