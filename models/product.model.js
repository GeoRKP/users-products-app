const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let productSchema = new Schema({
    product: {type: String, required: true},
    cost: {type: Number, required: true},
    description: {type: String},
    quantity: {type: Number, required: true, default: 0}
},
{
    collection: 'products',
    timestamps: true,
    collation: {
        caseLevel: false
    }
})

module.exports = mongoose.model('Product', productSchema);