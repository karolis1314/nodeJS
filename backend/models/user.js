const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    password: String,
    isAdmin: Boolean,
    houseNumber: String,
    city: String,
    zip: String,
    country: String,
    date: { type: Date, default: Date.now }
});

exports.User = mongoose.model('User', userSchema);