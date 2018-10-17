const express = require("express");
const router = express.Router();
const User = require("../models/users")
const Photo = require("../models/photo");

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

router.get("/new", (req, res) => {
    res.render("new.ejs");
});

router.post("/", (req, res) => {
    User.create(req.body, (err, data) => {
        if(err){
            console.log(err);
        } else {
            res.redirect("/");  
        };
    });
});

router.get("/:id/edit", (req, res) => {
    User.find({name: req.params.id}, (err, foundData)=> {
        if(err){
            console.log(err);
        } else {
            res.render("edit.ejs", {
                data: foundData
            });
        };
    });
});

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