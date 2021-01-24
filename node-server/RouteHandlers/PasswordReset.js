const router = require('express').Router()
const User = require('../models/UserModel')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/reset', (req,res) =>{
    const {username, password,newpassword} = req.body

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
                        bcryptjs.genSalt(10, (error,salt) =>{
                            if(error){
                                console.log("error while salting :",error)
                                res.json({status: false})
                            }
                            else{
                                bcryptjs.hash(newpassword,salt, (err,hash) => {
                                    if(err){
                                        console.log("error while hashing :",err)
                                        res.json({status: false})
                                    }
                                    else{
                                        user.password = hash
                                        user.save()
                                        res.json({ok:true})
                                    }
                                })
                            }
                        })
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