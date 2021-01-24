const router = require('express').Router()
const UserModel = require('../models/UserModel')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/create', (req,res)=>{
    if(req.headers.authorization !== null && req.headers.authorization !== undefined){
        const tokens = req.headers.authorization.split(' ')
        const token = tokens[1]
        jwt.verify(token,'RINniroinur9@hr493..;?',(err,decoded)=>{
            if(err){
                console.log(err)
                res.json({ok:false})
            }
            if(decoded.auth===true){
                const {firstName, lastName, username, email, password, title, dateOfBirth, fatherName, phoneNumber, address,
                    team, salary, auth, state, zipcode, city, gender} = req.body
           
               UserModel.find({username : username, email : email}, (error,user) =>{
                   if(error){
                       console.log('something went wrong')
                       res.json({ok : false})
                   }
                   else{
                       if(user.length > 0){
                           console.log('user already exists')
                           res.json({ok : false})
                       }
                       else{
                           let User = new UserModel({
                               firstName,
                               lastName,
                               email,
                               username,
                               password,
                               phoneNumber,
                               title,dateOfBirth,fatherName,address,team,salary,auth,zipcode,state,city,gender
                           })
                           console.log(User)
                           bcryptjs.genSalt(10, (error,salt) =>{
                               if(error){
                                   console.log("error while salting :",error)
                                   res.json({ok: false})
                               }
                               else{
                                   bcryptjs.hash(User.password,salt, (err,hash) => {
                                       if(err){
                                           console.log("error while hashing :",err)
                                           res.json({ok: false})
                                       }
                                       else{
                                           User.password = hash
                                           User.save( (err,user) => {
                                               if(err){
                                                   console.log('error during saving :',err)
                                                   res.json({ok : false})
                                               }
                                               else{
                                                   console.log("User created")
                                                   res.status(200).json({ok : true})
                                               }
                                           })
                                       }
                                   })
                               }
                           })
                       }
                   }
               })
            }
            else{
                res.json({ok:false})
            }
        })
    }
    else{
        res.json({ok:false})
    }
})

module.exports = router