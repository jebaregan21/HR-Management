const router = require('express').Router()
const User = require('../models/UserModel')
const Bonus = require('../models/BonusModel')
const jwt = require('jsonwebtoken')

router.get('/bonus/status',(req,res)=>{
    if(req.headers.authorization!== null && req.headers.authorization !== undefined){
    const tokens = req.headers.authorization.split(' ')
    const token = tokens[1]
    jwt.verify(token,'RINniroinur9@hr493..;?',(err,decoded)=>{
        if(err){
            res.json({ok : false})
        }
        else{
            if(decoded.auth === true){
                Bonus.find({requestedFrom:decoded.userId},(err,bonus)=>{
                    console.log(bonus)
                    if(err){
                        res.json({ok:false})
                    }
                    else if(bonus === null || bonus === undefined){
                        res.json({ok :true, bonus : null,auth:true})
                    }
                    else{
                        res.json({ok:true,bonus,auth:true})
                    }
                })
            }
            else{
                Bonus.find({userId:decoded.userId},(err,bonus)=>{
                    if(err){
                        res.json({ok:false})
                    }
                    else if(bonus === null || bonus === undefined){
                        res.json({ok :true, bonus : null,auth:false})
                    }
                    else{
                        res.json({ok:true,bonus,auth:false})
                    }
                })
            }
        }
    })
    }else{
        res.json({ok:false})
    }
})
router.post('/bonus/status/:id',(req,res)=>{
    const id = req.params.id
    const tokens = req.headers.authorization.split(' ')
    const token = tokens[1]
    jwt.verify(token,'RINniroinur9@hr493..;?',(err,decoded)=>{
        if(err){
            res.json({ok:false})
        }
        else{
            if(decoded.auth === true){
                Bonus.findById(id,(err,bonus)=>{
                    if(err){
                        res.json({ok:false})
                    }
                    else{
                        if(req.body.action===true){
                            bonus.status = 'approved'
                            bonus.approvedAmount = req.body.amount
                        }
                        else{
                            bonus.status = 'rejected'
                        }
                        bonus.save()
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