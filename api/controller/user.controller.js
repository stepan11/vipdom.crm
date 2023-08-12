const express = require('express');
const User = require('../model/user.model');
const cors = require('cors');

const controller = express();
controller.use(express.json());
controller.use(cors());

// get all users
controller.get('/users', cors(), async (req, res) => {
    await User.find()
        .then((users) => {
            console.log('All users:', users);
            res.status(200).json(users);
        })
        .catch((err) => {
            console.error('Error retrieving users:', err);
            res.status(400).json(err);
        });
});

// create a new user
controller.post('/newuser', async (req, res) => {
    const { id, name, email, age, customers } = req.body;

    const newUser = new User({
        id,
        name,
        email,
        age,
        customers,
    });

    await newUser
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

// read a user
controller.get('/user/:id', async (req, res) => {
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

// delete a user
controller.delete('/deleteuser/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User deleted successfully',
            deletedUser,
        });
    } catch (err) {
        console.error('something went wrong', err);
        res.status(500).json({ message: 'something went wrong', err });
    }
});

module.exports = controller;
