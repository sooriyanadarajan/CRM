const mongoose = require('mongoose');

var meetingSchema = mongoose.Schema({
    organisedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    
    from_time: {
        type: Date,
        required: false
    },
    to_time: {
        type: Date,
        required: false,
        // 0 - created, 1 - pending, 2 - completed , 3 - hold
    },
    duration: {
        type: String,
        
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'}
    ],
    subject: {
        type:String,
        
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

var Meeting = mongoose.model('meeting', meetingSchema);

module.exports = Meeting;