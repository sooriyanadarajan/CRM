const mongoose = require('mongoose');

var bugSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    }, 
    from_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    to_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    bug_no:{
        type:Number
    },
    File:{
        type:String
    },
    screenshot:{
        type:String
    },
    description:{
        type:String
    },
    active:{
        type:String
    },
    project_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
    },
    date:{
        type:Date
    },
    duration:{
        type:String
    },
    status: {
        type: Number,
        default: 0
    },
    deleted: {
        type: Boolean,
        default:false
    }
})

var bug = mongoose.model('bug', bugSchema);

module.exports = bug;