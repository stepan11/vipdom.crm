const express = require("express");
const Customer = require("../model/customer.model");
const User = require("../model/user.model");
const cors = require("cors");

const controller = express();
controller.use(express.json());
controller.use(cors());

// create a new customer
controller.post("/newcustomer", cors(), async (req, res) => {
    const { id, name, email, type } = req.body;

    const newCustomer = new Customer({
        id,
        name,
        email,
        type,
    });

    await newCustomer
        .save()
        .then((customer) => {
            console.log("customer saved successfully");
            res.status(201).json(customer);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// read a customer
controller.get("/customer/:id", cors(), async (req, res) => {
    const customerId = req.params.id;

    try {
        if (customerId.length != 24) {
            console.error("customer ID is not valid");
            return res
                .status(404)
                .json({ message: "customer ID is not valid" });
        }

        const customer = await Customer.findById(customerId);

        if (!customer) {
            return res.status(404).json({ message: "customer is not found" });
        }

        res.status(200).json(customer);
    } catch (err) {
        console.error("Error retrieving customer:", err);
        res.status(400).json(err);
    }
});

// delete a customer
controller.delete("/deletecustomer/:id", cors(), async (req, res) => {
    const customerId = req.params.id;

    try {
        const deletedCustomer = await Customer.findByIdAndDelete(customerId);

        if (!deletedCustomer) {
            console.log("Customer not found");
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({
            message: "Customer deleted successfully",
            deletedCustomer,
        });
    } catch (err) {
        console.error("something went wrong", err);
        res.status(500).json({ message: "something went wrong", err });
    }
});

// get all customers
controller.get("/customers", cors(), (req, res) => {
    Customer.find()
        .then((customers) => {
            console.log("All customers:", customers);
            res.status(200).json(customers);
        })
        .catch((err) => {
            console.error("Error retrieving customers:", err);
            res.status(400).json(err);
        });
});

// assign customer to the user
controller.post("/addcustomertouser", cors(), async (req, res) => {
    const { userId, customerId } = req.body;

    try {
        const user = await User.findOne({ id: userId })
            .then((user) => {
                if (user) {
                    return user;
                } else {
                    console.log("user does not exist");
                }
            })
            .catch((err) => {
                console.error("Error finding user:", err);
            });

        const customer = await Customer.findOne({ id: customerId })
            .then((customer) => {
                if (customer) {
                    return customer;
                } else {
                    console.log("customer does not exist");
                }
            })
            .catch((err) => {
                console.error("Error finding customer:", err);
            });

        if (!user.customers.includes(customer.id)) {
            user.customers.push(customer.id);
            user.save()
                .then((user) => {
                    res.status(200).json(user);
                    console.log("the customer has been assigned to the user");
                })
                .catch((err) => {
                    "Something went wrong:", console.error(err);
                });
        } else {
            res.status(400).json(user);
            console.log(
                "the customer is already assigned to the user",
                user.customers
            );
        }
    } catch (e) {
        console.error("Something went wrong", e);
    }
});

module.exports = controller;
