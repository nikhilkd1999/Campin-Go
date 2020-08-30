const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));


let friends = ["Nishant", "Tejas", "Prasanna", "Harshvardhan", "Mayur"];
// let friend = "Nishant";





app.get("/", function(req, res){
    res.render("friend_ejs", {friends:friends});
});

app.post("/addFriend", function(req, res){
    // res.render("friend", {friend:friend});
    let newfrienddd = req.body.newfriend;
    if(newfrienddd!==""){
        friends.push(newfrienddd);
    }
    res.redirect("/");
});









app.listen(80,function(){
    console.log("Server started successfully!!!!");
});