const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

var adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required: true,
        minlength:8,
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


// Sign JWT and return
adminSchema.methods.generateAuthToken = async function () {
  const admin = this
  const token = await jwt.sign({ _id: admin._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
  //console.log(token)
  return token
}

let Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;