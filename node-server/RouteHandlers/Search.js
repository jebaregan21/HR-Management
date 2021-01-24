const router = require('express').Router()
const User = require('../models/UserModel')

router.post('/search',(req,res)=>{
    const {type,team,title} = req.body
    let search = {}
    if(type===0){
        search = {
                    // to get all the docs
        }
    }
    else if(type === 1){
        search = {
            team : team
        }
    }
    else if(type === 2){
        search = {
            title : title
        }
    }
    else{
        search = {
            title:title,
            team:team
        }
    }
    console.log(type,team,title)
    User.find(search,(err,user)=>{
        console.log(user)
        if(err){
            res.json({ok:false})
        }
        else if(user===null || user === undefined){
            res.json({ok:true,user})
        }
        else{
            res.json({ok:true,user})
        }
    })
})

module.exports = router