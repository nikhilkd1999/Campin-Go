
const Campground = require("../models/campground"),
      Comment    = require("../models/comment");




let middlewareObj = {


    isLoggedIn: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error", "Please Log In First");
        res.redirect("/login");
    },


    checkCampgroundOwnership: function (req, res, next) {
        if (req.isAuthenticated()) {
            Campground.findById(req.params.id, function (err, foundCampground) {
                if (err) {
                    console.log(err);
                    req.flash("error", "Campground Not Found");
                    res.redirect("back");
                }
                else {

                    if (!foundCampground) {
                        req.flash("error", "Item not found.");
                        return res.redirect("back");
                    }


                    if (String(foundCampground.author.id) == String(req.user._id)) {
                        next();
                    }
                    else {
                        console.log("Hi")
                        req.flash("error", "You do not have Permission to do that");
                        res.redirect("back");
                    }
                }
            })
        }
        else {
            req.flash("error", "You do not have Permission to do that");
            res.redirect("back");
        }

    },
    
    
    
    checkCommentOwnership: function (req, res, next) {
        if (req.isAuthenticated()) {
            Comment.findById(req.params.comment_id, function (err, foundComment) {
                if (err) {
                    console.log(err);
                    req.flash("error", "Comment Not Found");
                    res.redirect("back");
                }
                else {

                    if (!foundComment){
                        req.flash("error", "Item not found.");
                        return res.redirect("back");
                    }



                    if (String(foundComment.author.id) == String(req.user._id)) {
                        next();
                    }
                    else {
                        console.log("Hi")
                        req.flash("error", "You do not have Permission to do that");
                        res.redirect("back");
                    }
                }
            })
        }
        else {
            req.flash("error", "You do not have Permission to do that");
            res.redirect("back");
        }
        
    }
    
};


module.exports = middlewareObj;