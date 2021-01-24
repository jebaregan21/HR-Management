const router = require('express').Router()
const User = require('../models/UserModel')
const Loan = require('../models/LoanModel')
const jwt = require('jsonwebtoken')

router.get('/loan',(req,res)=>{
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

router.post('/loan',(req,res)=>{
    const tokens = req.headers.authorization.split(' ')
    const token = tokens[1]
    const {amount,type,requestedFrom} = req.body
    console.log(req.body)
        jwt.verify(token,'RINniroinur9@hr493..;?',(err,decoded)=>{
            if(err){
                res.json({ok : false})
            }
            else{
                const loan = new Loan({
                    userId : decoded.userId,
                    amount,type,
                    requestedFrom,
                    requester:decoded.firstName
                })
                loan.save((error,doc)=>{
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
                            user.loanRequests.push(doc._id)
                            user.save()
                            res.json({ok:true})
                        }
                    })
                })
            }
        })
    
})

module.exports = router