const MongoClient = require('mongodb').MongoClient;

const ObjectId = require('mongodb').ObjectId

const url = 'mongodb://localhost:27017';

const dbName = 'szhmqd27';


//插入一条数据
const insertSingle = (collectionName, data ,callblack)=>{
    MongoClient.connect(url,{useNewUrlParser:true},function(err,client){
        const db = client.db(dbName);

        const collection = db.collection(collectionName);

        collection.insertOne(data,(err,doc)=>{
            client.close()
            callblack(err,doc)
        })
    })
}

//查找1条数据
const findYige = (collectionName, data, callblack) => {
    MongoClient.connect(url,{useNewUrlParser: true}, function (err, client) {

        const db = client.db(dbName);

        const collection = db.collection(collectionName);

        collection.findOne(data,(err,doc)=>{
            client.close()
            callblack(err,doc)
        })
    })
}

//查找多条数据
const findMany = (collectionName,data,callblack)=>{
    MongoClient.connect(url,{useNewUrlParser:true},function (err,client){
        const db = client.db(dbName);

        const collection = db.collection(collectionName);

        collection.find(data).toArray((err,docs)=>{
            client.close()
            callblack(err,docs)
        })
    })
}
//更改一条数据
const updateYige =(collectionName,condition,data,callblack)=>{
    MongoClient.connect(url,{useNewUrlParser: true}, function (err, client) {

        const db = client.db(dbName);

        const collection = db.collection(collectionName);

        collection.updateOne(condition,{ $set:data },(err,result)=>{
            client.close()
            callblack(err,result)
        })
    })
}
//删除一条数据
const deleteYige = (collectionName,data,callblack)=>{
    MongoClient.connect(url,{useNewUrlParser: true}, function (err, client) {

        const db = client.db(dbName);

        const collection = db.collection(collectionName);

        collection.deleteOne(data,(err,result)=>{
            client.close()
            callblack(err,result)
        })
    })
}


module.exports = {
    findYige,
    insertSingle,
    findMany,
    deleteYige,
    ObjectId,
    updateYige
}

