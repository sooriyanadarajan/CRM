const mongoose = require('mongoose');

var leaveSchema = mongoose.Schema({

    reason: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    from: {
        type: Date
    },
    to: {
        type: Date
    },
    cc: {
        type: String
    },
    leaveStatus: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
    deleted: {
        type: String,
    }
})

var leave = mongoose.model('leave', leaveSchema);

module.exports = leave;