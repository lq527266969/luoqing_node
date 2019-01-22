const path = require('path')

const template = require('art-template')

const databasetools = require(path.join(__dirname,'../tools/datbasetools'))

const getStudentPage = (req,res)=>{
    const keywords = req.query.keywords || ''

    databasetools.findMany('studentInfo',{name:{$regex:keywords}},(err,docs)=>{
        // const id = ObjectId(_iD)
        
        const html = template(path.join(__dirname,'../public/views/list.html'),{students:docs,keywords,loginedName:req.session.loginedName})
        res.send(html)
    })
}

const getAddStudentPage = (req,res)=>{
    const html = template(path.join(__dirname,'../public/views/add.html'),{loginedName:req.session.loginedName})
    res.send(html)
}

const AddStudentPage = (req,res)=>{
    databasetools.insertSingle('studentInfo',req.body,(err,result)=>{
        if(!result){
            res.send('<script>alert("插入失败")</script>')
        }else{
            res.send('<script>location=`/studentManagement/list`</script>')
        }
    })
}

const getEditStudentPage =(req,res)=>{
    const _id =databasetools.ObjectId(req.params.studentId)
    
    databasetools.findYige('studentInfo',{_id},(err,doc)=>{
        doc.loginedName=req.session.loginedName
       const html = template(path.join(__dirname,'../public/views/edit.html'),doc)
        res.send(html)
    })
}

const editStudent =(req,res)=>{
    const _id =databasetools.ObjectId(req.params.studentId)
    databasetools.updateYige('studentInfo',{_id},req.body,(err,result)=>{
        if(!result){
            res.send('<script>alert("修改失败")</script>')
        }else{
            res.send('<script>location=`/studentManagement/list`</script>')
        }
    })
}

const deleteStudent = (req,res)=>{
    const _id =databasetools.ObjectId(req.params.studentId)
    databasetools.deleteYige('studentInfo',{_id},(err,result)=>{
        if(!result){
            res.send('<script>alert("删除失败")</script>')
        }else{
            res.send('<script>location=`/studentManagement/list`</script>')
        }
    })
}
//导出

module.exports= {
    getStudentPage,
    getAddStudentPage,
    AddStudentPage,
    getEditStudentPage,
    editStudent,
    deleteStudent
    
}