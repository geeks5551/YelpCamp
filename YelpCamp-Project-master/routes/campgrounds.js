var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/",function(req, res){
    Campground.find({},function(err, allCampgrounds){
        if(err)
            console.log(err);
        else
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
    })
})

router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

router.post("/", middleware.isLoggedIn, function(req,res){
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {id: req.user._id, username: req.user.username};
    var newCamp = {name:name, price:price, image:image, description:desc, author:author};
    Campground.create(newCamp, function(err, newCampground){
        if(err)
            console.log(err);
        else{
            req.flash("success", "Campground Successfully Added !");
            res.redirect("/campgrounds");
        }
    })
});

router.get("/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            // console.log(err);
            req.flash("error", "You don't have Permission to do that !");
            return res.redirect("/campgrounds");
        }
        else{
            // console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
        Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground});
        });
});

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCampground){
        if(err){
            req.flash("error", err.message);
            res.redirect("/campgrounds");
        }
        else{
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(err){
        if(err){
            req.flash("error", err.message);
            res.redirect('/');
        }
        else{
            req.flash("error", "Campground Deleted !!!");
            res.redirect("/campgrounds");
        }
            
    });
});

module.exports = router;