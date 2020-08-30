const express         =   require("express"),
app                   =   express(),
bodyParser            =   require("body-parser"),
Campground            =   require("./models/campground"),
Comment               =   require("./models/comment"),
seedDB                =   require("./seeds"),
User                  =   require("./models/user"),
mongoose              =   require("mongoose"),
flash                 =   require("connect-flash"),
LocalStrategy         = require("passport-local"),
passport              = require("passport"),
methodOverride        = require("method-override"),
passportLocalMongoose = require("passport-local-mongoose"),
campgroundRoutes      = require("./routes/campgrounds"),
commentRoutes         = require("./routes/comments"),
indexRoutes           = require("./routes/index");


// const request = require("request");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
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


app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.flashMessageError = req.flash("error");
    res.locals.flashMessageSuccess = req.flash("success");
    next();
});




app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);





/////////////////






//////////////////

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
mongoose.connect('mongodb://localhost/yelp_v11', {useNewUrlParser: true});

// mongoose.connect("mongod://localhost/campgrounds",)


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to Database");
  seedDB();
});
/////////////////////////////////////////////


//////////////////////ROUTS





app.listen(80, ()=>{
    console.log("Server Started....");
});