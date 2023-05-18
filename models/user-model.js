const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Must Provide name"],
        trim: true,
        maxlength: [25, "Name cannot be more than 25 characters"]
    }, email: {
        type: String,
        required: [true, "Must Provide email"],
        trim: true,
        maxlength: [25, "email cannot be more than 25 characters"],
        unique: true
    },
    phone_no: {
        type: String,
        required: [true, "Must Provide phone-no"],
        trim: true,
        maxlength: [13, "phone no cannot be more than 25 characters"]
    },
    password: {
        type: String,
        required: [true, "Must Provide password"],
        trim: true,
        maxlength: [125, "password cannot be more than 125 characters"]
    },
    work_status: {
        type: String,
        required: [true, "Must Provide job_status"],
        trim: true,
        maxlength: [15, "job_status cannot be more than 15 characters"]
    },
    image: {
        type: String,
        trim: true,
        maxlength: [200, "image name cannot be more than 200 characters"]
    },
    resume: {
        type: String,
        trim: true,
        maxlength: [200, "resume name cannot be more than 200 characters"]
    },
    skills: {
        type: String,
        trim: true,
        maxlength: [200, "skills cannot be more than 200 characters"]
    },
    education: {
        type: String,
        trim: true,
        maxlength: [200, "Education cannot be more than 200 characters"]
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', UserSchema);