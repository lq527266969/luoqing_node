const path = require('path')

const template = require('art-template')

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'szhmqd27';
const getStudentPage = (req,res)=>{
    const keywords = req.query.keywords || ''

    MongoClient.connect(url, function(err, client) {
       
        const db = client.db(dbName);
        
        const collection = db.collection('studentInfo');

        collection.find({name:{$regex:keywords}}).toArray((err,docs)=>{
            client.close()
            const html = template(path.join(__dirname,'../public/views/list.html'),{students:docs,keywords})
            res.send(html)
        })
        
      });
}

//导出

module.exports= {
    getStudentPage
}