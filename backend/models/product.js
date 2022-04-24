const mongoose = require('mongoose');

//Product schemas
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
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

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema.set('toJSON', {
    virtuals: true
});

exports.Product = mongoose.model('Product', productSchema);