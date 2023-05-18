const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    job_id: {
        type: String,
        required: [true, "Must Provide job_id"],
        trim: true,
    },
    company_id: {
        type: String,
        required: [true, "Must Provide company_id"],
        trim: true,
    },
    user_id: {
        type: String,
        required: [true, "Must Provide user_id-no"],
        trim: true,
    },
    username: {
        type: String,
        required: [true, "Must Provide username"],
        trim: true,
    },
    user_mail: {
        type: String,
        required: [true, "Must Provide user_mail"],
        trim: true,
    },
    user_mobile: {
        type: String,
        required: [true, "Must Provide mobile"],
        trim: true,
    },
    applyDate: {
        type: String,
        required: [true, "Must Provide Application date"],
        trim: true,
        maxlength: [15, "applydate cannot be more than 15 characters"]
    },
    status: {
        type: String,
        default: "applied"
    }
})

module.exports = mongoose.model('Application', ApplicationSchema);