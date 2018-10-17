const express = require("express");
const router = express.Router();
const User = require("../models/users")
const Photo = require("../models/photo");

router.get("/", (req, res) => {
    Photo.find({}, (err, foundData) => {
        if(err){
            console.log("YOU GOT AN ERROR ", err)
        }else{
            res.render("photos/index.ejs", {
                photos: foundData
            });
        }
    })
});

router.get("/new", async (req, res) => {
    try{
        const foundUsers = await User.find();
        res.render("photos/new.ejs", {
            users: foundUsers
        });
    }catch(err){
        res.send(err);
    }
});

// posting a new photo
router.post("/", async (req, res) => {
    try{
        const newPhoto = await Photo.create(req.body);
        const userOwner = await User.findById(req.body.userId);

        userOwner.photos.push(newPhoto);
        userOwner.save();

        res.redirect("/photos");
    }catch(err){
        res.send(err);
    }
});

router.get("/:id", async (req, res) => {
    try{
        const foundPhoto = await Photo.findById(req.params.id);
        res.render("photos/show.ejs", {
            photo: foundPhoto
        });
    }catch(err){
        res.send(err);
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const foundPhoto = await Photo.findByIdAndDelete(req.params.id);
        res.redirect("/photos")
    }catch(err){
        res.send(err);
    }
});

module.exports = router;