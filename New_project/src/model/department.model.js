const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    code: {
        type:String,
        required:true,
        unique:true
    },
    departmentCode: {
        type:String,
        required:true,
        unique:true
    },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'College',
    },

}, {
    timestamps:true
});

DepartmentSchema.index({ college: 1, name: 1, }, { unique: true });

const Department = mongoose.model('Department', DepartmentSchema, 'department');

module.exports = Department;