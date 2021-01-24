const mongoose  = require('mongoose')

const LoanSchema = mongoose.Schema({
    userId : {
        type : String,
        required  : true
    },
    requester :{
        type: String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    requestedFrom : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true,
        default : 'pending'
    },
    approvedAmount : {
        type : Number,
        required : true,
        default : 0
    },
    type : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('LoanModel',LoanSchema)