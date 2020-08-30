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


router.get("/campgrounds/new", function(req, res){
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


router.post("/campgrounds", function(req, res){
    let name = req.body.name;
    let img = req.body.image;
    let desc = req.body.description;
    let newCampground = {name:name, image:img, description: desc};
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





module.exports = router;