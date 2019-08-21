const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./databaseHandler/index')


const app = express()
const apiPort = 5001;

app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(bodyParser.json())

var startServer = ()=>{app.listen(apiPort,()=>{console.log(`Server is listening on port ${apiPort}`)})};

db.connectPG(startServer)

app.get('',(req,res)=>{
    console.log("Hit");
    res.status(200).json({msg:'hii'})
});

app.use('/',require('./route_module'))