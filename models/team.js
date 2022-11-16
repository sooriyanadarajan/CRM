const mongoose = require('mongoose');

var teamSchema = mongoose.Schema({

    name: {
        type: String,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    teamLeader: {
        type: String,
    },
    reportingPerson: {
        type: String
    },
    status: {
        type: Boolean
    },
    deleted: {
        type: String,
    },
}, { timestamps: true });

var teamActivity = mongoose.model('team', teamSchema);

module.exports = teamActivity;