const express           =   require("express"),
app               =   express(),
{ urlencoded }    =   require("express"),
mongoose          =   require("mongoose");


// const request = require("request");

app.set("view engine", "ejs");
app.use(urlencoded({extended:true}));

// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});
mongoose.connect('mongodb://localhost/campgrounds', {useNewUrlParser: true});

// mongoose.connect("mongod://localhost/campgrounds",)


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to Database");
});

const campgroundSchema = new mongoose.Schema({
    name : String,
    image : String,
    description : String
});

const campground = mongoose.model("campground", campgroundSchema);




app.get("/", function(req, res){
    res.render("landing");
});


app.get("/campgrounds", function(req, res){
    campground.find({},function(err, allcampgrounds)
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
    console.log(req.params.id);
    campground.findById(req.params.id,function(err, foundCampground){
        if(err){
            console.log("Err finding campground");
            console.log(err);
        }
    else{
        console.log(foundCampground);
        res.render("show", {campground: foundCampground});
    }
    });
});


app.post("/campgrounds", function(req, res){
    let name = req.body.name;
    let img = req.body.image;
    let desc = req.body.description;
    let newCampground = {name:name, image:img, description: desc};
    campground.create(newCampground, function(err, campgrnd){
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