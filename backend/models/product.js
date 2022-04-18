const mongoose = require('mongoose');
const { Category } = require('./category');

//Product schemas
const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    description: String,
    image: Array,
    category: Category,
    color: String,
    screen: String,
    processor: String,
    ram: String,
    storage: String,
    battery: String,
    camera: String,
    warranty: String,
    resolution: String,
    weight: String,
    other: String,
    packaging: String,
    graphics: String,
    wireless: String,
    mobileConnectivity: String,
    compatibility: String,
    termsAndConditions: String
});


exports.Product = mongoose.model('Product', productSchema);