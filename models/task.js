const mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    from_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    to_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project'
    },
    team_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team'
    },
    name: {
        type: String,
        required: true,
    },
    expiry: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 0,
        enum: [0, 1, 2, 3]
        // 0 - created, 1 - pending, 2 - completed , 3 - hold
    },
    deleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

var Task = mongoose.model('task', taskSchema);

module.exports = Task;