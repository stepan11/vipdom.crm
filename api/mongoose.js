const mongoose = require('mongoose')
require('dotenv').config()

// connect to the database
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{console.log('Connected to MongoDB')})
.catch((error)=>{console.error('Error connecting to MongoDB:', error)})

// define a mongoose user schema
const userSchema = new mongoose.Schema({
id: {
    type: Number,
    required: true,
    unique: true
},
name: {
    type: String,
    required: true
},
email: {
    type: String,
    required: true,
    unique: true
},
age:{
    type: Number,
    required: false
},
customers: {
    type: Array,
    required: true
}
})

// customer schema
const customerSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    }
    })

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
})

// create a model of User

const User = mongoose.model('User', userSchema)

const Customer = mongoose.model('Customer', customerSchema)

const Property = mongoose.model('Property', propertySchema)

module.exports = {User, Customer, Property}