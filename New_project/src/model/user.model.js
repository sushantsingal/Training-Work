const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        phone: {
            type:String,
            required:true,
            unique:true
        },
        email: {
            type: String,
            required: true,
            unique:true,
        },
        rollNumber: {
            type: String,
            required: true,
            unique:true
        },
        regNumber: {
            type: String,
            unique:true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        passwordResetToken: {
            type: String,
            required:false,
        },
        gender: {
            type: String,
            required: true,
            enum: ['Male', 'Female', 'other']
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
        college: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'College',
            required: true,
        },
        department: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Department',
        },
        role: {
            type: String,
            required: true,
            enum: ['ADMIN', 'STUDENT', 'TEACHER']
        },
        dateOfBirth: {
            type: Date,
            required:true
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', UserSchema, 'user');

module.exports = User;