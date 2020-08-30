const express = require('express');


const app = express();


app.get("/", function(request, response){
    response.send("Welcome to my assignment!!");
});

app.get("/repeat/:word/:number", function(req, res){
    let n = Number(req.params.number);
    let text = req.params.word;
    // console.log(n);
    let reptext = '';
    // for(let i = 0; i<n;i++)
    while(n--)
    {
        reptext += text + ' ';  
    }
    res.send(reptext);
    // console.log("Hi");
});

app.get("*", function(req,res){
    res.send("Page Not Found!!!!!!! \n Go read app.js!!")
})

app.listen(3000,function(req, res){
    console.log("Server started!!");
});