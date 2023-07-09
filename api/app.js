const express = require('express');
const mongoose  = require('mongoose');
const User = require('./mongoose');


const app = express();
app.use(express.json())
const port = process.env.POORT || 3000;

app.get("/about", (req,res)=>{
    res.send("About page");
})

// create a new user
app.post("/newuser", (req,res)=>{
    const {id, name, email, age} = req.body

    const newUser = new User({
        id,
        name,
        email,
        age
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

app.listen(port, ()=>{
    console.log(`Server listening on ${port}`);
})