const mongoose = require("mongoose");

const connectString = "mongodb://localhost/userphotos";

mongoose.connect(connectString, { useNewUrlParser: true});

mongoose.connection.on("connected", () => {
    console.log("mongoose connected at ", connectString);
});

mongoose.connection.on("disconnected", () => {
    console.log("mongoose disconnected");
});

mongoose.connection.on("error", (err) => {
    console.log("mongoose error ", err);
});