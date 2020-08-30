const express     =   require("express"),
router               =   express.Router(),
Campground        =   require("../models/campground"),
Comment           =   require("../models/comment"),
middleWare          = require("../middleware");





router.get("/campgrounds/:id/comments/new",middleWare.isLoggedIn ,function(req, res){
    
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/new",{campground:foundCampground});
        }
    });
    
});

router.post("/campgrounds/:id/comments",middleWare.isLoggedIn,function(req, res){

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

                    newComment.author.id = req.user._id;
                    newComment.author.username = req.user.username;
                    newComment.save();

                    foundCampground.comments.push(newComment);
                    foundCampground.save()
                    res.redirect("/campgrounds/" + foundCampground._id);
                }
            });
        }
    });
});



router.get("/campgrounds/:id/comments/:comment_id/edit",middleWare.isLoggedIn ,function(req, res){
    
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    console.log(err);
                    res.redirect("back");
                }
                else{
                    res.render("comments/edit", {campground_id : req.params.id, comment : foundComment });
                }
            });
        });



router.put("/campgrounds/:id/comments/:comment_id",middleWare.isLoggedIn ,function(req, res){

    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, function(err, foundComment){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

router.delete("/campgrounds/:id/comments/:comment_id",middleWare.checkCommentOwnership, function(req, res){

    Comment.findByIdAndDelete(req.params.comment_id, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            res.redirect("back");
        }
    });
});















module.exports = router;