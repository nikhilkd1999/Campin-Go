const express = require("express");
const { request } = require("http");

const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});



app.get("/results", function(req,res){
    let querY = req.query.search;

    let url = "http://www.omdbapi.com/?s="+ querY +"&apikey=thewdb";

    request(url, function(error, responce, body){
        if(!error && responce.statusCode == 200){
            let parsedData = JSON.parse(body);
            responce.render("results", {data:parsedData});
        }
    })
});



app.listen(80, ()=>{
    console.log("Server Started...");
});
