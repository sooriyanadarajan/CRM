const mongoose = require('mongoose')

var BugActivitySchema = mongoose.Schema({

    action:{
        type:String,
        // required:true,
    },
    createdOn:{
        type:Date,
    },
    updatedOn:{
        type:Date,
    },
    createdBy:{
        type:String,type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    updatedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    status:{
        type:Boolean,
    },
    bug_no:{
        type:Number,
    },
    bug_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bug',
    }

}, { timestamps: true });

var BugActivity = mongoose.model('BugActivity', BugActivitySchema);

module.exports = BugActivity;