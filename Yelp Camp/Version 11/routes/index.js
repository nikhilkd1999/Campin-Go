const express     =   require("express"),
router               =   express.Router(),
User                  =   require("../models/user"),
passport          =   require("passport");





router.get("/", function(req, res){
    res.render("landing");
});




/// AUTH ROUTES

//show sign up form
router.get("/register", function(req, res){
    res.render("register"); 
 });
 //handling user sign up
 router.post("/register", function(req, res){
     let newUser = new User({username: req.body.username});
     User.register(newUser, req.body.password, function(err, user){
         if(err){
             console.log(err);
             req.flash("error", err.message);
             return res.redirect('/register');
         }
         passport.authenticate("local")(req, res, function(){
             req.flash("success", "Welcome To Yelp Camp " + user.username);
            res.redirect("/campgrounds");
         });
     });
 });
 //// LogIn

 router.get("/login", function(req,res){
     res.render("login");
 });

 router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req, res){
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged You Out")
    res.redirect("/");
});



module.exports = router;