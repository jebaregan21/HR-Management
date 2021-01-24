const router = require('express').Router()
const jwt = require('jsonwebtoken')
const HolidayModel = require('../models/HolidayModel')

router.get('/calender',(req,res)=>{
    HolidayModel.find({},(err,holidays)=>{
        if(err){
            res.json({ok : false})
        }
        else if(holidays===null || holidays===undefined || holidays.length===0){
            res.json({ok : false})
        }
        else{
            res.json({ok : true, holidays})
        }
    })
})

router.post('/calender',(req,res)=>{
    console.log(req.headers)
    const tokens = req.headers.authorization.split(' ')
    const token = tokens[1]
    if(token !== null || token!== undefined){
        jwt.verify(token,'RINniroinur9@hr493..;?',(err,decoded)=>{
            if(decoded.auth === true){
                const {date,reason} = req.body
                let Holiday = new HolidayModel({
                    date,reason
                })

                Holiday.save(err=>{
                    if(err){
                        console.log(err)
                        res.json({ok:false})
                    }
                    else{
                        HolidayModel.find({},(err,holidays)=>{
                            if(err){
                                res.json({ok:false})
                            }
                            else if(holidays===null || holidays===undefined){
                                res.json({ok:false})
                            }
                            else{
                                res.json({ok:true,holidays})
                            }
                        })
                    }
                })
            }
            else{
                res.json({ok:false})
            }
        })
    }
})

module.exports = router