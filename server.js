const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const firstController = require("./controllers/first-controller");

// require db
require("./db/db");

// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method"));

// controllers
app.use("/",firstController);


// listenter
app.listen(3000, () => {
    console.log("THIS SHIT IS LIVE @ 3000")
});