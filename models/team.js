const mongoose = require('mongoose');

var teamSchema = mongoose.Schema({

    name: {
        type: String,
    },
    members: {
        type: Array,
    },
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