const mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    projectlead:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    team_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'team'
    },
    description : {
        type: String,
        required: true,
    },
    expiry: {
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
    },
}, { timestamps: true });

var Project = mongoose.model('project', projectSchema);

module.exports = Project;