const mongoose = require('mongoose');

// create category schema
const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        enum: ['primary', 'JSS', 'SSS', 'not assigned'],
        default: 'not assigned',
        required: true
    },
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }]
})

module.exports = mongoose.model("Category", CategorySchema);