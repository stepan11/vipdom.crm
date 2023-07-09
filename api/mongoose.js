const mongoose = require('mongoose')

// connect to the database
mongoose.connect('mongodb+srv://admin:SL1SoDVbFEwTOyHX@vipdom.k1010fw.mongodb.net/vipdom', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{console.log('Connected to MongoDB')})
.catch((error)=>{console.error('Error connecting to MongoDB:', error)})

// define a mongoose schema
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
}
})

// create a model of User

const User = mongoose.model('User', userSchema)

module.exports = User