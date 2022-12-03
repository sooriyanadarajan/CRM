const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var userSchema = mongoose.Schema({

    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    userType:{
        type:String
    },
    roleType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
      //developer, tester, hr, tl, pl, 
    },
    logInStatus:{
        type:Boolean,
        default:false
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        minlength:8
    },
    token:{
        type: String
    }
})



// Sign JWT and return
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = await jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
    return token
}

// check email and password match
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('User Not Found. Kindly Register')
    }
    if (!user.password) {
        throw new Error('Invalid Credential')
    }
    const check = await bcrypt.compare(password, user.password)
    if (!check) {
        throw new Error('Invalid Credential')
    }
    return user
}


var User = mongoose.model('user', userSchema);

module.exports = User;