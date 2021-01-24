const router = require('express').Router()
const Leave = require('../models/LeaveModel')
const jwt = require('jsonwebtoken')

router.get('/leave/status',(req,res)=>{
    if(req.headers.authorization!== null && req.headers.authorization !== undefined){
    const tokens = req.headers.authorization.split(' ')
    const token = tokens[1]
    jwt.verify(token,'RINniroinur9@hr493..;?',(err,decoded)=>{
        if(err){
            res.json({ok : false})
        }
        else{
            if(decoded.auth === true){
                Leave.find({requestedFrom:decoded.userId},(err,leave)=>{
                    console.log(leave)
                    if(err){
                        res.json({ok:false})
                    }
                    else if(leave === null || leave === undefined){
                        res.json({ok :true, leave : null,auth:true})
                    }
                    else{
                        res.json({ok:true,leave,auth:true})
                    }
                })
            }
            else{
                Leave.find({userId:decoded.userId},(err,leave)=>{
                    if(err){
                        res.json({ok:false})
                    }
                    else if(leave === null || leave === undefined){
                        res.json({ok :true, leave : null,auth:false})
                    }
                    else{
                        res.json({ok:true,leave,auth:false})
                    }
                })
            }
        }
    })
    }else{
        res.json({ok:false})
    }
})
router.post('/leave/status/:id',(req,res)=>{
    const id = req.params.id
    const tokens = req.headers.authorization.split(' ')
    const token = tokens[1]
    jwt.verify(token,'RINniroinur9@hr493..;?',(err,decoded)=>{
        if(err){
            res.json({ok:false})
        }
        else{
            if(decoded.auth === true){
                Leave.findById(id,(err,leave)=>{
                    if(err){
                        res.json({ok:false})
                    }
                    else{
                        if(req.body.action===true){
                            leave.status = 'approved'
                        }
                        else{
                            leave.status = 'rejected'
                        }
                        leave.save()
                        res.json({ok:true})  
                    }
                })
            }
            else{
                res.json({ok:false})
            }
        }
    })
})

module.exports = router