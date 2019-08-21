const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./databaseHandler/index')
const User = require('./models/userlogin')

const app = express()
const apiPort = 5000 ;

app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(bodyParser.json())

startServer = ()=>{
    app.listen(apiPort,()=>console.log(`Server is running on port ${apiPort}`))
}

app.post('/submit',(req,res)=>{
    const body = req.body
    console.log(body)
    if(!body){
        return res.status(400).json({
            success: false,
            error: `provide user details`,
        })
    }

    const user = new User(body)

    if(!user){
        return res.status(400).json({success: false,error: err})
    }

    user.save().then(()=>{
        return res.status(201).json({
            success: true,
            id: user._id,
            message: `User Added`,
        })
    }).catch(error=>{
        return res.status(400).json({
            error: error,
            message: `User not Created`,
        })
    })

})

db.connectMongo(startServer)




