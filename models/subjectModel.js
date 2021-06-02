const mongoose = require('mongoose');

// create subject schema
const SubjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isRegistered: {
        type: Boolean,
        default: 1
    },
    category: {
        type: String,
        enum: ['primary', 'JSS', 'SSS', 'not assigned'],
        default: 'not assigned',
        required: true
    },
    lessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    }]

})

module.exports = mongoose.model("Subject", SubjectSchema);