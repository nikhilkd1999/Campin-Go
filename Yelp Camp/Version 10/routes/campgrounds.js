const express     =   require("express"),
router               =   express.Router(),
Campground        =   require("../models/campground"),
middleWare          = require("../middleware");








router.get("/campgrounds", function(req, res){
    Campground.find({},function(err, allcampgrounds)
    {
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/campgrounds", {campgrounds:allcampgrounds});
        }

    });
});


router.get("/campgrounds/new", middleWare.isLoggedIn ,function(req, res){
    res.render("campgrounds/new");
});



router.get("/campgrounds/:id", function(req, res){
    // console.log(req.params.id);
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log("Err finding campground");
            console.log(err);
        }
    else{
        // console.log(foundCampground);
        res.render("campgrounds/show", {campground: foundCampground});
    }
    });
});


router.post("/campgrounds",middleWare.isLoggedIn,function(req, res){
    let name = req.body.name;
    let img = req.body.image;
    let desc = req.body.description;
    let author = {
        id : req.user._id,
        username : req.user.username
    };
    let newCampground = {name:name, image:img, description: desc, author:author};
    Campground.create(newCampground, function(err, campgrnd){
        if(err)
        {
            console.log(err);
        }
        else{
            console.log("Newly Added Campground");
            console.log(campgrnd);
        }
    });
    res.redirect("campgrounds");
});

router.get("/campgrounds/:id/edit", middleWare.checkCampgroundOwnership , function(req,res){
    Campground.findById(req.params.id,function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/edit", {campground : foundCampground});
        }
    });
});

router.put("/campgrounds/:id", middleWare.checkCampgroundOwnership ,function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.updatedCampground, function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds/"+req.params.id);
        }
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/campgrounds/:id", middleWare.checkCampgroundOwnership , function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(err){
        if(err){
            console.log(err);
            return res.redirect("/campgrounds/"+req.params.id);
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});






module.exports = router;