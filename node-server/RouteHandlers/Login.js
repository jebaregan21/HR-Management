const router = require('express').Router()
const User = require('../models/UserModel')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/login', (req,res) =>{
    const {username, password} = req.body

    User.findOne({username : username}, (error,user)=>{
        if(error){
            console.log("An error has happened")
            res.json({ok : false})
        }
        else if(user===null || user===undefined){
            console.log("User not found")
            res.json({ok : false})
        }
        else{
            console.log(user)
            bcryptjs.compare(password,user.password, (error,success)=>{
                if(error){
                    console.log("something went wrong")
                    res.json({ok : false})
                }
                else{
                    if(success){
                        const token = jwt.sign({userId : user._id, firstName : user.firstName, auth : user.auth},'RINniroinur9@hr493..;?',{
                            expiresIn : 43200 //12 hours
                        })
                        res.status(200).json({ok:true,token})
                    }
                    else{
                        console.log('incorrect password')
                        res.json({ok : false})
                    }
                }
            })
        }
        
    })
})

module.exports = router