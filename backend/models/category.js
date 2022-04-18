const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: String,
    icon: String,
    color: String
});

exports.Category = mongoose.model('Category', categorySchema);