const express = require("express");
const router = express.Router();
const User = require("../models/users")
const Photo = require("../models/photo");

// index
router.get("/", (req, res) => {
    User.find({}, (err, foundData) => {
        if(err){
            console.log(err)
        }else{
            res.render("index.ejs", {
                data: foundData
            });
        }
    })
});

// new user
router.get("/new", (req, res) => {
    res.render("new.ejs");
});

// post a new user
router.post("/", (req, res) => {
    User.create(req.body, (err, data) => {
        if(err){
            console.log(err);
        } else {
            res.redirect("/");  
        };
    });
});

// edit user
router.get("/:id/edit", (req, res) => {
    User.findById(req.params.id, (err, foundData)=> {
        if(err){
            console.log(err);
        } else {
            res.render("edit.ejs", {
                data: foundData
            });
        };
    });
});

// update user
router.put("/:id", (req, res) => {
    User.findById(req.params.id, req.body, (err, foundData)=> {
        if(err){
            console.log(err);
        } else {
            res.redirect("/")
        };
    });
});

// making a new photo for a user
router.get("/:id/new-photo", (req, res) => {
    User.findById(req.params.id, (err, foundData)=> {
        if(err){
            console.log(err);
        } else {
            res.render("newphoto.ejs", {
                data: foundData
            });
        };
    });
});

// post new photo
router.post("/:id", (req, res) => {
    User.findById(req.params.id, (err, foundData)=> {
        Photo.create(req.body, (err, newPhoto) => {
            foundData.photos.push(newPhoto);
            foundData.save((err,saved) => {
                res.redirect("/");
            });
        });
    });
});

// delete a specific photo
router.delete("/:id/:photoid", (req, res) => {
    User.findById(req.params.id, (err, foundData)=> {
        Photo.findByIdAndDelete(req.params.photoid, (err, deletedPhoto) => {
            console.log(foundData.photos);
            const photos = foundData.photos;
            for(let i=0; i<photos.length; i++){
                if(photos[i].id === req.params.photoid.toString()){
                    foundData.photos[i].remove();
                    foundData.save((err,saved) => {
                        res.redirect("/");
                    });
                }
            }
        });
    });
});

// show a user and their photos
router.get("/:id", (req, res) => {
    User.findById(req.params.id, (err, foundData)=> {
        if(err){
            console.log(err);
        } else {
            res.render("show.ejs", {
                data: foundData,
                photos: foundData.photos
            });
        };
    });
});

// delete a user
router.delete("/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, foundData)=> {
        if(err){
            console.log(err);
        } else {
            console.log("DELETED");
            res.redirect("/");
        };
    });
});

module.exports = router;