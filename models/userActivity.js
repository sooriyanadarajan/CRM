const mongoose = require('mongoose');

var userSchema = mongoose.Schema({

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

var UserActivity = mongoose.model('user', userSchema);

module.exports = UserActivity;