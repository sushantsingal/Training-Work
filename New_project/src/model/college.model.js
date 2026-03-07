const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    phone: {
        type:String,
        required:true,
        unique:true
    },
    address: {
            type: Object,
            property: {
                addressLine1: {
                    type:String,
                    required:true
                },
                addressLine2: {
                    type:String,
                    required:false
                },
                city: {
                    type:String,
                    required: true
                },
                pinCode: {
                    type:String,
                    required: true
                },
                state: {
                    type:String,
                    required: true
                },
                country: {
                    type:String,
                    required: true
                },
            }
    },
    rank: {
        type: Number,
        required:false,
        default:0
    },
    type: {
        type:String,
        required:true,
        enum: ['Private', 'Public']
    },
    startsFrom: {
        type: Date
    }
})

const College = mongoose.model('College', CollegeSchema, 'college');

module.exports = College;