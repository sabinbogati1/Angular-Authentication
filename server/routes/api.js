const express = require("express");
const router = express.Router();
const User = require("../model/user");

//Connnecting To MLab Database
const mongoose = require("mongoose");
const db = "mongodb://sabin:incorrect1@ds145184.mlab.com:45184/eventsdb";

mongoose.connect(db, err => {
    if (err) {
        console.error("Error! " + err);
    }
    else {
        console.log("Connected To Mongodb");
    }
})

router.get("/", (req, res) => {
    res.send("FROM API route..")
});

router.post("/register", (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if (error) {
            console.log(error);
        }
        else {
            res.status(200).send(registeredUser);
        }
    })
});

router.post("/login", (req, res) => {
    let userData = req.body;

    User.findOne({ email: userData.email }, (error, user) => {
        if (error) {
            console.log("error while logging ==>", error);
        }
        else {
            if (!user) {
                res.status(401).send("Invalid Email..");
            }
            else {
                if (user.password !== userData.password) {
                    res.status(401).send("Invalid Password")
                } else {
                    res.status(200).send(user);
                }
            }
        }
    })
})


module.exports = router;