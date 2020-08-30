const express = require("express"),
    app         = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    flash       = require("connect-flash"),
    User = require("./models/user"),
    AccountDetails = require("./models/accountDetails");




app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: "Avni",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
////////////////////////


app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.flashMessageError = req.flash("error");
    res.locals.flashMessageSuccess = req.flash("success");
    next();
});

//////////////////

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
mongoose.connect('mongodb://localhost/password-manager', { useNewUrlParser: true });

// mongoose.connect("mongod://localhost/campgrounds",)


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected to Database");
});


//////////  ROUTES

///////////

app.get("/add",(req,res)=>{
    res.render("add");
});


app.get("/",function(req, res){
    res.render("landing");
});

app.get("/news",function(req, res){
    res.render("news");
});



// app.get("/account",function(req,res){

//     console.log(req.user);

//     User.findById(req.user._id,function(err, foundUser){
//         if(err){
//             console.log(err);
//         }
//         else{
//             foundUser.populate("accountDetails");
//             console.log(foundUser);
//             res.render("account", {user:foundUser});
//         }
//     });

// });
//////////////////////
app.get("/account",function(req,res){

    console.log(req.user);

    User.findById(req.user._id).populate("accountDetails").exec(function(err, foundUser){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundUser);
            flash("success", foundUser);
            res.render("account", {user:foundUser});
        }
    });

});


//////////////////////////////////

app.post("/add", function(req,res){
    User.findById(req.user.id, function(err, foundUser){
        if(err){
            console.log(err);
        }
        else{
            AccountDetails.create(req.body.AccountDetails, function(err, newDetails){
                if(err){
                    console.log(err);
                }
                else{
                    req.flash("success", newDetails.accountName + "  -  " + newDetails.accountUserName + "  -  " + newDetails.accountPassword + "  -  " + newDetails._id);
                    foundUser.accountDetails.push(newDetails);
                    foundUser.save();
                    res.redirect("/account");
                }
            })
        }
    })
})











//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//show sign up form
app.get("/register", function(req, res){
    res.render("register"); 
 });
 //handling user sign up
 app.post("/register", function(req, res){
     let newUser = new User({username: req.body.username});
     User.register(newUser, req.body.password, function(err, user){
         if(err){
             console.log(err);
             req.flash("error", err.message);
             return res.redirect('/register');
         }
         passport.authenticate("local")(req, res, function(){
             req.flash("success", "Welcome To Passwords " + user.username);
            res.redirect("/account")
         });
     });
 });
 //// LogIn

 app.get("/login", function(req,res){
     res.render("login");
 });

 app.post("/login", passport.authenticate("local", {
    successRedirect: "/account",
    failureRedirect: "/login"
}) ,function(req, res){
});

app.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged You Out")
    res.redirect("/");
});













app.listen(80,()=>{
    console.log("Server Started.......");
});