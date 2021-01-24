const router = require('express').Router()
const User = require('../models/UserModel')
const Loan = require('../models/LoanModel')
const jwt = require('jsonwebtoken')

router.get('/loan/status',(req,res)=>{
    if(req.headers.authorization!== null && req.headers.authorization !== undefined){
    const tokens = req.headers.authorization.split(' ')
    const token = tokens[1]
    jwt.verify(token,'RINniroinur9@hr493..;?',(err,decoded)=>{
        if(err){
            res.json({ok : false})
        }
        else{
            if(decoded.auth === true){
                Loan.find({requestedFrom:decoded.userId},(err,loan)=>{
                    console.log(loan)
                    if(err){
                        res.json({ok:false})
                    }
                    else if(loan === null || loan === undefined){
                        res.json({ok :true, loans : null,auth:true})
                    }
                    else{
                        res.json({ok:true,loans:loan,auth:true})
                    }
                })
            }
            else{
                Loan.find({userId:decoded.userId},(err,loan)=>{
                    if(err){
                        res.json({ok:false})
                    }
                    else if(loan === null || loan === undefined){
                        res.json({ok :true, loans : null,auth:false})
                    }
                    else{
                        res.json({ok:true,loans:loan,auth:false})
                    }
                })
            }
        }
    })
    }else{
        res.json({ok:false})
    }
})
router.post('/loan/status/:id',(req,res)=>{
    const id = req.params.id
    console.log(id)
    const tokens = req.headers.authorization.split(' ')
    const token = tokens[1]
    jwt.verify(token,'RINniroinur9@hr493..;?',(err,decoded)=>{
        if(err){
            res.json({ok:false})
        }
        else{
            if(decoded.auth === true){
                Loan.findById(id,(err,loan)=>{
                    if(err){
                        res.json({ok:false})
                    }
                    else{
                        if(req.body.action===true){
                            loan.status = 'approved'
                            loan.approvedAmount = req.body.amount
                        }
                        else{
                            loan.status = 'rejected'
                        }
                        loan.save()
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