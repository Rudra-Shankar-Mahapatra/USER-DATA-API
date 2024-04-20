const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    phoneno: { type: Number, required: true }
});

const User = mongoose.model('User', userSchema); // Define and export the model

module.exports = User;
