const router = require('express').Router()
const User = require('../models/UserModel')
const Leave = require('../models/LeaveModel')
const jwt = require('jsonwebtoken')

router.get('/leave',(req,res)=>{
    User.find({auth:true},(err,users)=>{
        if(err){
            res.json({ok:false})
        }
        else if(users===null || users===undefined){
            res.json({ok:false})
        }
        else{
            res.json({ok:true,list:users})
        }
    })
})

router.post('/leave',(req,res)=>{
    const tokens = req.headers.authorization.split(' ')
    const token = tokens[1]
    const {numberOfDays,startDate,endDate,reason,requestedFrom} = req.body
    console.log(req.body)
        jwt.verify(token,'RINniroinur9@hr493..;?',(err,decoded)=>{
            if(err){
                res.json({ok : false})
            }
            else{
                const leave = new Leave({
                    userId : decoded.userId,
                    numberOfDays,
                    startDate,
                    endDate,
                    reason,
                    requestedFrom,
                    requester:decoded.firstName
                })
                leave.save((error,doc)=>{
                    console.log(doc)
                    if(error){
                        console.log(error)
                        res.json({ok : false})
                    }
                    User.findOne({_id:decoded.userId},(err,user)=>{
                        if(err){
                            res.json({ok:false})
                        }
                        else if(user=== null || user=== undefined){
                            res.json({ok : false})
                        }
                        else{
                            user.leaveRequests.push(doc._id)
                            user.save()
                            res.json({ok:true})
                        }
                    })
                })
            }
        })
    
})

module.exports = router