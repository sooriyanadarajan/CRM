const mongoose = require('mongoose');
const { devNull } = require('os');

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
        type: Array,
    },
    bug_no:{
        type:Number,
        default:1
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
    //0 - created, 1 - open, 2 - onhold, 3 - not a bug , 4 -completed
    deleted: {
        type: Boolean,
        default:false
    }
})

var bug = mongoose.model('bug', bugSchema);

module.exports = bug;