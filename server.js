const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const userController = require("./controllers/usercontroller");
const photosController = require("./controllers/photos");

// require db
require("./db/db");

// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method"));

// controllers
app.use("/photos", photosController);
// this one has to go last b/c it's a catch-all
app.use("/", userController);


// listenter
app.listen(3000, () => {
    console.log("THIS SHIT IS LIVE @ 3000")
});