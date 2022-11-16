const mongoose = require('mongoose');

var userActivitySchema = mongoose.Schema({

    name:{
        type:String
    },
    logintime: {
        type: String,

    },
    os: {
        type: String,
        
    },
    sessiontiming: {
        type: String,

    },
    deleted: {
        type: String,
        
    },
}, { timestamps: true });

var UserActivity = mongoose.model('userActivity', userActivitySchema);

module.exports = UserActivity;