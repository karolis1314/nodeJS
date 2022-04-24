const mongoose = require('mongoose');
const { OrderItem } = require('./orderItem');


const ordersSchema = mongoose.Schema({
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }],
    shippingAddress1: String,
    shippingAddress2: String,
    shippingCity: String,
    shippingZip: String,
    phoneNumber: String,
    status: String,
    totalPrice: Number,
    date: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

ordersSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

ordersSchema.set('toJSON', {
    virtuals: true
});

exports.Order = mongoose.model('Order', ordersSchema);