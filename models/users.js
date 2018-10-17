const mongoose = require("mongoose");
const photo = require("./photo");

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    photos: [photo.schema]
});

module.exports = mongoose.model("User", userSchema);