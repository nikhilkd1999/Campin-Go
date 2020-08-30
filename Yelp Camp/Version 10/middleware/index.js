
const Campground = require("../models/campground"),
      Comment    = require("../models/comment");




let middlewareObj = {


    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/login");
    },


    checkCampgroundOwnership: function (req, res, next) {
        if (req.isAuthenticated()) {
            Campground.findById(req.params.id, function (err, foundCampground) {
                if (err) {
                    console.log(err);
                    res.redirect("back");
                }
                else {
                    if (String(foundCampground.author.id) == String(req.user._id)) {
                        next();
                    }
                    else {
                        console.log("Hi")
                        res.redirect("back");
                    }
                }
            })
        }
        else {
            res.redirect("back");
        }

    },



    checkCommentOwnership: function (req, res, next) {
        if (req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, function (err, foundComment) {
                if (err) {
                    console.log(err);
                    res.redirect("back");
                }
                else {
                    if (String(foundComment.author.id) == String(req.user._id)) {
                        next();
                    }
                    else {
                        console.log("Hi")
                        res.redirect("back");
                    }
                }
            })
        }
        else {
            res.redirect("back");
        }

    }

};


module.exports = middlewareObj;