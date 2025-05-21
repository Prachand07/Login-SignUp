const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    mobile: String,
    gender: String,
    city: String,
    role: String,
    password: {
        type: String,
        select: false
    },
    passwordHistory: [{
        type: String,
        select: false
    }],
    lastLogin: Date,
    role: String
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    this.passwordHistory = [this.password]; 

    next();
});


UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
