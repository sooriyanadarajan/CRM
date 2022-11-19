const mongoose = require('mongoose');

var courseSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    from: {
        type: Date
    },
    to: {
        type: Date
    },
    date: {
        type: date
    },
    status: {
        type: Boolean,
        default: true
    },
    deleted: {
        type: String,
    }
})

var Course = mongoose.model('course', courseSchema);

module.exports = Course;