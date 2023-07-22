const express = require('express');
// const mongoose  = require('mongoose');
const User = require('./model/user.model');
const Customer = require('./model/customer.model');
const Property = require('./model/property.model');

require('./mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
const port = process.env.POORT || 3000;

app.get('/about', (req, res) => {
    res.send('About page');
});

// create a new user
app.post('/newuser', (req, res) => {
    const { id, name, email, age, customers } = req.body;

    const newUser = new User({
        id,
        name,
        email,
        age,
        customers,
    });

    newUser
        .save()
        .then((user) => {
            console.log('user saved successfully');
            res.status(201).json(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// assign customer to the user
app.post('/addcustomertouser', async (req, res) => {
    const { userId, customerId } = req.body;

    const user = await User.findOne({ id: userId })
        .then((user) => {
            if (user) {
                return user;
            } else {
                console.log('user does not exist');
            }
        })
        .catch((err) => {
            console.error('Error finding user:', err);
        });

    const customer = await Customer.findOne({ id: customerId })
        .then((customer) => {
            if (customer) {
                return customer;
            } else {
                console.log('customer does not exist');
            }
        })
        .catch((err) => {
            console.error('Error finding customer:', err);
        });

    if (!user.customers.includes(customer.id)) {
        user.customers.push(customer.id);
        user.save()
            .then((user) => {
                res.status(200).json(user);
                console.log('the customer has been assigned to the user');
            })
            .catch((err) => {
                'Something went wrong:', console.error(err);
            });
    } else {
        res.status(400).json(user);
        console.log(
            'the customer is already assigned to the user',
            user.customers
        );
    }
});

// create a new customer
app.post('/newcustomer', (req, res) => {
    const { id, name, email, type } = req.body;

    const newCustomer = new Customer({
        id,
        name,
        email,
        type,
    });

    newCustomer
        .save()
        .then((customer) => {
            console.log('customer saved successfully');
            res.status(201).json(customer);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create a new property
app.post('/newproperty', (req, res) => {
    const { id, name, type } = req.body;

    const newProperty = new Property({
        id,
        name,
        type,
    });

    newProperty
        .save()
        .then((property) => {
            console.log('property saved successfully');
            res.status(201).json(property);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get all users
app.get('/users', (req, res) => {
    User.find()
        .then((users) => {
            console.log('All users:', users);
            res.status(200).json(users);
        })
        .catch((err) => {
            console.error('Error retrieving users:', err);
            res.status(400).json(err);
        });
});

// read a user

app.get('/user/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        if (userId.length != 24) {
            console.error('user ID is not valid');
            return res.status(404).json({ message: 'user ID is not valid' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'user is not found' });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error('Error retrieving user:', err);
        res.status(400).json(err);
    }
});

// get all customers
app.get('/customers', (req, res) => {
    Customer.find()
        .then((customers) => {
            console.log('All customers:', customers);
            res.status(200).json(customers);
        })
        .catch((err) => {
            console.error('Error retrieving customers:', err);
            res.status(400).json(err);
        });
});

// read a customer

app.get('/customer/:id', async (req, res) => {
    const customerId = req.params.id;

    try {
        if (customerId.length != 24) {
            console.error('customer ID is not valid');
            return res
                .status(404)
                .json({ message: 'customer ID is not valid' });
        }

        const customer = await Customer.findById(customerId);

        if (!customer) {
            return res.status(404).json({ message: 'customer is not found' });
        }

        res.status(200).json(customer);
    } catch (err) {
        console.error('Error retrieving customer:', err);
        res.status(400).json(err);
    }
});

// get all properties
app.get('/properties', (req, res) => {
    Property.find()
        .then((properties) => {
            console.log('All properties:', properties);
            res.status(200).json(properties);
        })
        .catch((err) => {
            console.error('Error retrieving properties:', err);
            res.status(400).json(err);
        });
});

// read a property

app.get('/property/:id', async (req, res) => {
    const propertyId = req.params.id;

    try {
        if (propertyId.length != 24) {
            console.error('property ID is not valid');
            return res
                .status(404)
                .json({ message: 'property ID is not valid' });
        }

        const property = await Property.findById(propertyId);

        if (!property) {
            return res.status(404).json({ message: 'property is not found' });
        }

        res.status(200).json(property);
    } catch (err) {
        console.error('Error retrieving property:', err);
        res.status(400).json(err);
    }
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});
