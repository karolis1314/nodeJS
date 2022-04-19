const mongoose = require('mongoose');

//Product schemas
const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    quantity: Number,
    description: String,
    image: [{
        type: String
    }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
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
    termsAndConditions: String,
    isFeatured: Boolean
});


exports.Product = mongoose.model('Product', productSchema);