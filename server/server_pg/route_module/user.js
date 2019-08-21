const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');
const db = require('../databaseHandler/index')
const client = db.getClient();

router.post('/newuser',(req,res)=>{
    const name = (typeof req.body.name === 'undefined') ? null : req.body.name;
    const email = (typeof req.body.email === 'undefined') ? null : req.body.email;
    const phno = (typeof req.body.phno === 'undefined') ? null : req.body.phno;
    const password = (typeof req.body.pass === 'undefined') ? null : req.body.pass;
    const uid = uniqid.process('user')
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$%^&=+*]).{6,}$/

    if( name == null || email == null || phno == null || password == null){
        res.status(400).json({success:false , error : 'All feilds are mandetory'})
    }
    else if(password.length < 8){
        res.status(401).json({success:false , error : 'Password length'})
    }
    else if(!pattern.test(password)){
        res.status(401).json({success:false , error : 'regex doesnt match'})
    }
    else {
        sql = `insert into users values($1,$2,$3,$4,$5)`
        params = [name,uid,email,phno,password]
        client.query(sql,params,(err,result)=>{
            if(!err){
                console.log("Insert successfull : "+ result.rows)
                res.status(200).json({success: true , msg:'Data Inserted'})
            }else{
                console.log(err)
                res.sendStatus(401)
            }
        })
    }
});

router.post('/checkuser',(req,res)=>{

    const email = (typeof req.body.email === 'undefined') ? null : req.body.email;
    const password = (typeof req.body.pass === 'undefined') ? null : req.body.pass;
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[#$%^&=+*]).{6,}$/
    if(email == null || password == null){
        res.status(400).json({success: false , error :"All feilds are mandetory"})
    }
    else if(password.length < 8){
        res.status(401).json({success:false , error : 'Password length'})
    }
    else if(!pattern.test(password)){
        res.status(401).json({success:false , error : 'regex doesnt match'})
    }
    else{
        sql = "select password from users where email = $1"
        params = [email]
        client.query(sql,params,(err,result)=>{
            if(!err){
                if(result.rows[0].password == password)
                    res.status(400).json({success:true,error:"Login Successful"})
                else
                    res.status(400).json({success:false,error:"Incorrect password"})
            }
            else{
                console.log("Error : "+err)
                res.status(400).json({success:false,error:"server internal error"})
            }
        })
    }
})

module.exports = router;
