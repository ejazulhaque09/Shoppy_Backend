const mongoose = require('mongoose')

// product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    thumbnail:{
        type: String
    } 
})

module.exports = mongoose.model('Product', productSchema)