const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
    name: String,
    img: {type: String, required: true}
});

module.exports = mongoose.model("Photo", photoSchema);