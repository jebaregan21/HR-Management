const router = require('express').Router()
const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const path = require('path')

router.get('/', (req,res)=>{
    if(req.headers.authorization !== null && req.headers.authorization !== undefined){
        let tokens = req.headers.authorization.split(' ')
        const token = tokens[1]
        jwt.verify(token,'RINniroinur9@hr493..;?',(err,decoded)=>{
            if(err){
                console.log(err)
                res.json({ok : false})
            }
            else{
                res.status(200).json({ok : true, firstName:decoded.firstName, userId : decoded.userId,auth:decoded.auth})
            }
        })
    }
    else{
        console.log('here')
        res.json({ok:false})
    }
})

module.exports = router