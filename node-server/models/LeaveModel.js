const mongoose = require('mongoose')

const LeaveSchema = mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    numberOfDays : {
        type : Number,
        required : true
    },
    requestedFrom : {
        type : String,
        required : true
    },
    startDate : {
        type : Date,
        required : true
    },
    reason : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : 'pending',
        required : true
    },
    requester :{
        type: String,
        required : true
    },
    endDate : {
        type : Date,
        default : null
    }
})

module.exports = mongoose.model('LeaveModel',LeaveSchema)