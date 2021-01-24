const mongoose = require('mongoose')

const BonusSchema = mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    approvedAmount : {
        type : Number,
        required : true,
        default : 0
    },
    requester :{
        type: String,
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
    amount : {
        type : Number,
        required : true
    }
})

module.exports = mongoose.model('BonusModel',BonusSchema)