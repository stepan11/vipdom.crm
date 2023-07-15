const express = require('express');
const mongoose  = require('mongoose');
const {User, Customer, Property} = require('./mongoose');

require('dotenv').config()

const app = express();
app.use(express.json())
const port = process.env.POORT || 3000;

app.get("/about", (req,res)=>{
    res.send("About page");
})

// create a new user
app.post("/newuser", (req,res)=>{
    const {id, name, email, age, customers} = req.body

    const newUser = new User({
        id,
        name,
        email,
        age,
        customers
    })

    newUser.save()
    .then((user)=>{
        console.log('user saved successfully');
        res.status(201).json(user)
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json(err)
    })
})

// assign customer to the user
app.post("/addcustomertouser", (req,res)=>{
    const {userId, customerId} = req.body

})

// create a new customer
app.post("/newcustomer", (req,res)=>{
    const {id, name, email, type} = req.body

    const newCustomer = new Customer({
        id,
        name,
        email,
        type
    })

    newCustomer.save()
    .then((customer)=>{
        console.log('customer saved successfully');
        res.status(201).json(customer)
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json(err)
    })
})

// create a new property
app.post("/newproperty", (req,res)=>{
    const {id, name, type} = req.body

    const newProperty = new Property({
        id,
        name,
        type
    })

    newProperty.save()
    .then((property)=>{
        console.log('property saved successfully');
        res.status(201).json(property)
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json(err)
    })
})

// get all users
app.get("/users", (req, res)=>{
    User.find()
    .then((users)=>{
        console.log("All users:", users);
        res.status(200).json(users)
    })
    .catch((err)=>{
        console.error("Error retrieving users:", err)
        res.status(400).json(err)
    })
})

// get all customers
app.get("/customers", (req, res)=>{
    Customer.find()
    .then((customers)=>{
        console.log("All customers:", customers);
        res.status(200).json(customers)
    })
    .catch((err)=>{
        console.error("Error retrieving customers:", err)
        res.status(400).json(err)
    })
})

// get all properties
app.get("/properties", (req, res)=>{
    Property.find()
    .then((properties)=>{
        console.log("All properties:", properties);
        res.status(200).json(properties)
    })
    .catch((err)=>{
        console.error("Error retrieving properties:", err)
        res.status(400).json(err)
    })
})

app.listen(port, ()=>{
    console.log(`Server listening on ${port}`);
})