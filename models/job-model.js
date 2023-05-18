const mongoose = require('mongoose');


const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Must Provide job title"],
        trim: true,
        maxlength: [50, "title cannot be more than 25 characters"]
    },
    description: {
        type: String,
        required: [true, "Must Provide description"],
        trim: true,
    },
    vacancy: {
        type: String,
        required: [true, "Must Provide vacancy"],
        trim: true
    },
    company_name: {
        type: String,
        required: [true, "Must Provide company name"],
        trim: true
    },
    company_id: {
        type: String,
        required: [true, "Must Provide company id"],
        trim: true
    },
    job_type: {
        type: String,
        required: [true, "Must Provide company name"],
        trim: true,
        maxlength: 50
    },
    experience: {
        type: String,
        required: [true, "Must Provide experience"],
        trim: true,
        maxlength: 50
    },
    salary: {
        type: String,
        required: [true, "Must Provide salary"],
        trim: true,
        maxlength: 10
    },
    area: {
        type: String,
        required: [true, "Must Provide area"],
        trim: true
    },
    datePosted: {
        type: String,
        required: [true, "Must Provide datePosted"],
        trim: true
    },
    status: {
        type: String,
        required: [true, "Must Provide company name"],
        trim: true,
        default: "active"
    }
})

module.exports = mongoose.model('Job', JobSchema);