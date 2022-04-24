const mongoose = require('mongoose');
const { Product } = require('./product');

//Add here from products price with populate.
const orderItemSchema = mongoose.Schema({
    product: 
    { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    price: Number,
    quantity: Number
});

orderItemSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderItemSchema.set('toJSON', {
    virtuals: true
});

exports.OrderItem = mongoose.model('OrderItem', orderItemSchema);