const mongoose = require('mongoose')

const HolidaySchema = mongoose.Schema({
    date : {
        type : Date,
        required : true
    },
    reason : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('HolidayModel',HolidaySchema)