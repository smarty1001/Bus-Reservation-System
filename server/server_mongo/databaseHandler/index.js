const mongoose = require('mongoose')
const mongourl = "mongodb+srv://mayank:mayank@cluster0-gzdqk.mongodb.net/test?retryWrites=true&w=majority"
let mongodn 

const connectMongo = (callback)=>{
    mongoose.connect(mongourl,{useNewUrlParser:true})
    .then((db)=>{
        console.log("Databse Conneted")
        mongodb = db;
        callback();
    }).catch(err=>{console.log(err)})
}

const getClient = ()=>{return mongodb}

const terminateConnection = ()=>{mongodb.close();}

module.exports = {
    connectMongo,
    getClient,
    terminateConnection
};