const express = require('express');
const User = require('./model/user.model');
const Customer = require('./model/customer.model');
const Property = require('./model/property.model');

const userController = require('./controller/user.controller');
const customerController = require('./controller/customer.controller');
const propertyController = require('./controller/property.controller');

const cors = require('cors');

require('./mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(userController);
app.use(customerController);
app.use(propertyController);
const port = process.env.PORT || 3000;

app.get('/about', (req, res) => {
    res.send('About page');
});

// listening to server
app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
