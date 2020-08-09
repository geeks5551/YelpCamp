var Campground = require("../models/campground");
var Comment = require("../models/comment");
const campground = require("../models/campground");
var middlewareObj = {
    checkCampgroundOwnership: function(req, res, next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCampground){
                if(err){
                    req.flash("error", "Sorry, that campground does not exist!");
                    res.redirect("back");
                } else {
                    if(foundCampground.author.id.equals(req.user._id))
                        next();
                    else {
                        req.flash("error", "You don't have Permission to do that !");
                        res.redirect("back");
                    }
                } 
            });
        } 
        else {
            req.flash("error", "You need to be Logged In to do that.... ");
            res.redirect("/login");
        }
    },

    checkCommentOwnership: function(req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    req.flash("error", "Sorry, that comment does not exist!");
                    res.redirect("back");
                }
                else{
                    if(foundComment.author.id.equals(req.user._id))
                        next();
                    else{
                        req.flash("error", "You don't have Permission to do that !");
                        res.redirect("/campgrounds/"+campground._id);
                    }
                } 
            });
        } 
        else {
            req.flash("error", "You need to be Logged In to do that.... ");
            res.redirect("/login");
        }
    },

    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "You need to be Logged In to do that.... ");
        res.redirect("/login");
    }
};

module.exports = middlewareObj;