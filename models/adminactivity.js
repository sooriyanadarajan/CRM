const mongoose = require('mongoose');

var AdminSchema = mongoose.Schema({
    browser: {
        type: String,
        required: true,
    },
    
}, { timestamps: true });

var Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;