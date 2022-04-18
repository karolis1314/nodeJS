const mongoose = require('mongoose');

//Product schemas
const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    description: String,
    image: String
});


exports.Product = mongoose.model('Product', productSchema);