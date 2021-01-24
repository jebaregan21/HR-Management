const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required: true
    },
    lastName : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    gender:{
        type : String,
        required : true
    },
    dateOfBirth : {
        type : Date,
        required : true
    },
    fatherName : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    state : {
        type : String,
        required : true
    },
    zipcode : {
        type : Number,
        required : true
    },
    team : {
        type : String,
        required : true
    },
    salary : {
        type : Number,
        required : true
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    leaveRequests : {
        type : [String]
    },
    bonusRequests : {
        type : [String]
    },
    loanRequests : {
        type : [String]
    },
    auth : {
        type : Boolean,
        required : true
    }
})
module.exports = mongoose.model('UserModel', userSchema)