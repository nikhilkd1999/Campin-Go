const express     =   require("express"),
app               =   express(),
bodyParser        =   require("body-parser"),
Campground        =   require("./models/campground"),
Comment           =   require("./models/comment"),
seedDB            =   require("./seeds")
mongoose          =   require("mongoose");


// const request = require("request");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
mongoose.connect('mongodb://localhost/yelp_v3', {useNewUrlParser: true});

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

app.get("/", function(req, res){
    res.render("landing");
});


app.get("/campgrounds", function(req, res){
    Campground.find({},function(err, allcampgrounds)
    {
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds", {campgrounds:allcampgrounds});
        }

    });
});


app.get("/campgrounds/new", function(req, res){
    res.render("new");
});



app.get("/campgrounds/:id", function(req, res){
    // console.log(req.params.id);
    Campground.findById(req.params.id,function(err, foundCampground){
        if(err){
            console.log("Err finding campground");
            console.log(err);
        }
    else{
        // console.log(foundCampground);
        res.render("show", {campground: foundCampground});
    }
    });
});


app.post("/campgrounds", function(req, res){
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





app.listen(80, ()=>{
    console.log("Server Started....");
});