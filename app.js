const path = require("path");
require('dotenv/config')
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const messagesRoutes = require("./routes/messages");
const userRoutes = require("./routes/user");
const app = express();
const mongo_db = process.env.remote_mongo_db


mongoose
    .connect(
        mongo_db
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/messages", messagesRoutes);
app.use("/api/user", userRoutes);

module.exports = app;