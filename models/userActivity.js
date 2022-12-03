const mongoose = require('mongoose');

var userActivitySchema = mongoose.Schema({

    name: {
        type: String,
        // required: true
    },
    logintime: {
        type: String,
        // required: true
    },
    sessiontiming: {
        type: String,
        // required: true
    },
    deleted: {
        type: Boolean,
        default: false,

    },

    devicename: {
        type: String,
        // required: true
    },
    browser: {
        type: String,
        // required: true
    },
    os: {
        type: String,
        // required: true
    },
    platform: {
        type: String,
        // required: true
    },
    version: {
        type: String,
        // required: true
    }
}, { timestamps: true });

var UserActivity = mongoose.model('userActivity', userActivitySchema);

module.exports = UserActivity;