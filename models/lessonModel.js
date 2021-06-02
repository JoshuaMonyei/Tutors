const mongoose = require('mongoose');

// create subject schema
const LessonSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    category: {
        type: String,
        enum: ['primary', 'JSS', 'SSS', 'not assigned'],
        default: 'not assigned',
        required: true
    },
    subject: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("Lesson", LessonSchema);