const express = require('express')

const path = require('path')

var session = require('express-session')

const bodyParser = require('body-parser')

const app =express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 },resave:false,saveUninitialized:true}))

//设置静态根目录
app.use(express.static(path.join(__dirname,'public')))

//拦截到所有的请求
app.all('/*',(req,res,next)=>{
    if(req.url.includes('account')){
        next()
    }else{
        if(req.session.loginedName){
            next()
        }else{
            res.send(`<script>alert('请先登录再操作');location="/account/login"</script>`)
        }
    }
})
//导入路由对象
const accountRouter = require(path.join(__dirname,'routers/accountRouter.js'))

const studentRouter = require(path.join(__dirname,'routers/studentRouter.js'))

app.use('/account',accountRouter)


 app.use('/studentManagement',studentRouter)

//启动
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err);
    }
    console.log('start ok');
    
})