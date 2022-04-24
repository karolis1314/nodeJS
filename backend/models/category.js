const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: String,
    icon: String,
    color: String
});

categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true
});

exports.Category = mongoose.model('Category', categorySchema);