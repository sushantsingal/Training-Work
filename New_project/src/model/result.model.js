const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    student: {
        type:String,
        required:true
    },
    semester: {
        type: String,
        required: true,
    },
    subjects: [{
        _id: false,
        subjectName: {
            type:String,
            required:true
        },
        marks: {
            type:Number,
            required:true,
            min: 0,
            max: 100,
        },
        grade: {
            type:String,
            enum: ['A+','A','B+','B','C+','C','D','F']
        }
    }],
    totalMarks: {
        type:Number,
        required:false
    },
    percentage: {
        type:Number,
        required:false
    },
    overallGrade: {
        type:String,
        enum: ['A+','A','B+','B','C+','C','D','F']
    },
    status: {
        type:String,
        enum:['Pass', 'Fali'],
        required:true
    },
    academicYear: {
        type:String,
        required:true
    },
})