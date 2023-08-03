const express = require('express');
const Property = require('../model/property.model');
const cors = require('cors');

const controller = express();
controller.use(express.json());

// create a new property
controller.post('/newproperty', (req, res) => {
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

// get all properties
controller.get('/properties', cors(), (req, res) => {
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
controller.get('/property/:id', async (req, res) => {
    const propertyId = req.params.id;

    try {
        if (propertyId.length != 24) {
            console.error('property ID is not valid');
            return res
                .status(404)
                .json({ message: 'property"s ID is not valid' });
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

// delete a property
controller.delete('/deleteproperty/:id', async (req, res) => {
    const propertyId = req.params.id;

    try {
        const deletedProperty = await Property.findByIdAndDelete(propertyId);

        if (!deletedProperty) {
            console.log('Property not found');
            return res.status(404).json({ message: 'Property not found' });
        }

        res.status(200).json({
            message: 'Property deleted successfully',
            deletedProperty,
        });
    } catch (err) {
        console.error('something went wrong', err);
        res.status(500).json({ message: 'something went wrong', err });
    }
});

module.exports = controller;
