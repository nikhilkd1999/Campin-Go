const express     =   require("express"),
router               =   express.Router(),
Campground        =   require("../models/campground"),
Comment           =   require("../models/comment");




router.get("/campgrounds/:id/comments/new",isLoggedIn ,function(req, res){
    
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground:foundCampground});
        }
    });
    
});

router.post("/campgrounds/:id/comments",isLoggedIn,function(req, res){

    let newComment = req.body.comment;
    // console.log(typeof newComment);
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{

            Comment.create(newComment, function(err, newComment){
                if(err){
                    console.log(err);
                }
                else{
                    foundCampground.comments.push(newComment);
                    foundCampground.save()
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
});



function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}




module.exports = router;