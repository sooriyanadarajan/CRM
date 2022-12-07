
// import { nanoid } from 'nanoid/async';
// const nanoid = require('nanoid')
var { nanoid } = require("nanoid");
// var ID = nanoid();
const mongoose = require('mongoose');
const { devNull } = require('os');
// const nanoid  = require('nanoid');

var bugSchema = mongoose.Schema({

    name: {
        type: String,
        // required: true
    }, 
    from_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        // required:true
    },
    to_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        type: Array,
        // required:true
    },
    bug_no:{
        type: Number,
        default: 0
        // default: () => nanoid(1),
        // index: { unique: true },
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
        // required:true
    },
    date:{
        type:Date,
        // required:true
    },
    duration:{
        type:String
    },
    status: {
        type:Number,
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