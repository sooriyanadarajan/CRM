const mongoose = require('mongoose');

var teamSchema = mongoose.Schema({

    name: {
        type: String,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    lead_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    reporting_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
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