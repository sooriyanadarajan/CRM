const mongoose = require('mongoose');

var bugSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    }, 
    from: {
        type: Date
    },
    to: {
        type: Date
    },
    date:{
        type:date
    },
    status: {
        type: Boolean,
        default: true
    },
    deleted: {
        type: String,
    }
})

var bug = mongoose.model('bug', bugSchema);

module.exports = bug;