const mongoose = require('mongoose');

var leaveSchema = mongoose.Schema({
    from_id:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'user'
    },
    to_id:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'user'
    },
    reason: {
        type: String,
    },
    type: {
        type: String,
        required: false
    },
    from: {
        type: Date
    },
    to: {
        type: Date
    },
    cc: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    date:{
        type: Date,
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