const express     =   require("express"),
router               =   express.Router(),
Campground        =   require("../models/campground");








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


router.get("/campgrounds/new", isLoggedIn ,function(req, res){
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


router.post("/campgrounds",isLoggedIn,function(req, res){
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



function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}




module.exports = router;