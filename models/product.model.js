const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let productSchema = new Schema({
    product: {
        type: String,
        required: [true, 'Product is a required field'],
        max: 100,
        unique: true,
        trim: true,
        lowercase: true
    },
    cost: {
        type: Number,
        max: 100
    },
    description: {
        type: String,
        required: [true, 'description is a required field'],
        max: 100,
        trim: true,
        lowercase: true
    },
    quantity: {
        type: Number,
        max: 100
    }
}, {
    collection: 'products',
    versionKey: false
    // timestamps: true
});

module.exports = mongoose.model('Product', productSchema);