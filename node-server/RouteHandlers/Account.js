const router = require('express').Router()
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

router.get('/account/:id',(req,res)=>{
    if(req.headers.authorization!== null && req.headers.authorization !== undefined){
    const id = req.params.id
    const tokens = req.headers.authorization.split(' ')
    const token = tokens[1]
    let auth = false
    User.findById(id,(err,user)=>{
        if(err){
            res.json({ok:false})
        }
        else{
            jwt.verify(token,'RINniroinur9@hr493..;?',(err,decoded)=>{
                if(err){
                    res.json({ok:false})
                }
                else{
                    if(decoded.userId === id){
                        auth = true
                        res.json({ok:true,user,auth})
                    }
                    else{
                        res.json({ok:true,user,auth})
                    }
                }
            })
            
        }
    })
    }else{
        res.redirect('/')
    }
})

module.exports = router