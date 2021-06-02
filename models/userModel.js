const mongoose = require('mongoose');

// Create User schema
const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['tutor', 'student', 'not assigned'],
        default: 'not assigned'
    }
    
},
{
    timestamps: true
}
);

module.exports = mongoose.model("User", UserSchema);