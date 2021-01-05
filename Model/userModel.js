const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//name, email, password
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name'],
        
    },
    email: {
        type: String,
        required: [true, 'Please Provide Your email'],
        unique: true,
        lowercase: true,
        validate:[validator.isEmail,'Please Provide a valid email']
    },
    photo: String,
    role: {
        type: String,
        enum: ['user','guide','lead-guide','admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please Provide a password'],
        minlength: 8,
        select: false
    },
    passwordChangedAt: Date
    
});

userSchema.pre("save", async function(next) {
    //only run if paswword actually modified
    if(!this.isModified('password')) return next();

    //hash the password
    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if(this.passwordChangedAt) {
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000, 10);
        console.log(changedTimeStamp, JWTTimestamp)
        return JWTTimestamp < changedTimeStamp;
    }

    //false means not changed
    return false
}
const User = mongoose.model('User',userSchema);

module.exports = User;