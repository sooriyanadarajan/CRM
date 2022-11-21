const mongoose = require('mongoose');

var roleSchema = mongoose.Schema({

    name:{
        type:String,
        required: true
    },
    roleType:{
        type:String
    },
    status: {
        type: Boolean
    },
    deleted: {
        type: Boolean,
        default: false,   
    }
}, { timestamps: true });

var Role = mongoose.model('role', roleSchema);

module.exports = Role;