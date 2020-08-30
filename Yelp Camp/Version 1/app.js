const express = require("express");

const app = express();
// const request = require("request");
const { urlencoded } = require("express");

app.set("view engine", "ejs");
app.use(urlencoded({extended:true}));


let cmpgrnds = [
                {name:"Sahyadri", image:"https://previews.123rf.com/images/dinodia/dinodia1709/dinodia170904934/85738281-aerial-view-of-sahyadri-mountains-of-maharashtra-india.jpg"},
                {name:"Himalay", image:"https://wallpapercave.com/wp/wp2752142.jpg"},
                {name:"Sahyadri", image:"https://previews.123rf.com/images/dinodia/dinodia1709/dinodia170904934/85738281-aerial-view-of-sahyadri-mountains-of-maharashtra-india.jpg"},
                {name:"Himalay", image:"https://wallpapercave.com/wp/wp2752142.jpg"},
                {name:"Sahyadri", image:"https://previews.123rf.com/images/dinodia/dinodia1709/dinodia170904934/85738281-aerial-view-of-sahyadri-mountains-of-maharashtra-india.jpg"},
                {name:"Himalay", image:"https://wallpapercave.com/wp/wp2752142.jpg"},
                {name:"Sahyadri", image:"https://previews.123rf.com/images/dinodia/dinodia1709/dinodia170904934/85738281-aerial-view-of-sahyadri-mountains-of-maharashtra-india.jpg"},
                {name:"Himalay", image:"https://wallpapercave.com/wp/wp2752142.jpg"}
];



app.get("/", function(req, res){
    res.render("landing");
});


app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds:cmpgrnds});
});


app.get("/campgrounds/new", function(req, res){
    res.render("new");
});


app.post("/campgrounds", function(req, res){
    let name = req.body.name;
    let img = req.body.image;
    let newCampground = {name:name, image:img};
    cmpgrnds.push(newCampground);
    res.redirect("campgrounds");
});



app.listen(80, ()=>{
    console.log("Server Started....");
});