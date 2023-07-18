const mongoose = require('mongoose')

// property schema
const propertySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

const Property = mongoose.model('Property', propertySchema)

module.exports = Property