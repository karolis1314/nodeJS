const mongoose = require('mongoose');
const { OrderItem } = require('./orderItem');


const ordersSchema = mongoose.Schema({
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }],
    shippingAddress1: {
        type: String,
        required: true
    },
    shippingAddress2: {
        type: String,
        required: true
    },
    shippingCity: {
        type: String,
        required: true
    },
    shippingZip: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    totalPrice: {
        type: Number,
        default: 0,
        required: true
    },
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