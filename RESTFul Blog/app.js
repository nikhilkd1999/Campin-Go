const { urlencoded } = require("express");

const express = require("express"),
      app     = express(),
      mongoose= require("mongoose"),
      bodyParser = require("body-parser")
      methodOverride = require("method-override");

/////////////////////////
app.set("view engine", "ejs");
app.use(express.static("public"));
// app.use(urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

///////////////// DATABASE CONFIG

mongoose.connect('mongodb://localhost/blogs', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  console.log("Connected to Database");
});


const blogSchema = new mongoose.Schema({
    title : String,
    image: String,
    content: String,
    date: {type: Date, default: Date.now}
});


const Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "First Blog",
//   image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//   content: " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit laudantium hic et saepe, minus corporis. Sequi laboriosam non eos quas autem, ratione repellat unde dignissimos impedit corrupti earum voluptate ducimus.  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem doloribus asperiores quas inventore exercitationem est placeat ad voluptatum, veritatis maxime voluptate eligendi fuga eaque debitis minima quod rem harum nemo accusamus perferendis. Velit, deserunt obcaecati non debitis incidunt itaque quaerat mollitia voluptas, sit tempore alias temporibus soluta molestiae doloremque aperiam?"
// });

//   ROUTS



///////// All Blogs
app.get("/blogs", (req, res)=>{
  Blog.find({}, function(err, blogs){
    if(err){
      console.log("Error finding the blogs");
    }
    else{
      res.render("blogs", {blogs:blogs});
    }
  });

});

////// New Blog
app.get("/blogs/new", function(req, res){
  res.render("new");
});

///////////////////////// Create New Blog
app.post("/blogs", (req, res)=>{
  
  let newBlog = { 
      title   : req.body.title,
      image   : req.body.image,
      content : req.body.content
  };

  Blog.create(newBlog);

  res.redirect("/blogs");

});


///////////// Read More Specific Blog 
app.get("/blogs/:id", (req, res)=>{
  
  Blog.findById(req.params.id, function(err, blog){
    if(err){
      console.log("Error finding the ID blog");
    }
    else{
      res.render("idblog", {blog:blog});
    }
  });

});

////////  Edit


app.get("/blogs/:id/edit", function(req,res){
   Blog.findById(req.params.id, function(err, foundBlog){
     if(err){
       console.log("Err finding id Blog");
     }
     else{
       res.render("edit", {blog:foundBlog});
     }
    });
});

///   Update blog
app.put("/blogs/:id", (req, res)=>{
  let newdata = req.body.blog;
  // console.log(newdata);
  Blog.findByIdAndUpdate(req.params.id, newdata, function(err, updatedBlog){
    if(err){
      // alert("Error");
      res.redirect("/blogs");
    }
    else{
      res.redirect("/blogs/"  + req.params.id);
    }
  });
 
});

// Destroy or DELETE

app.delete("/blogs/:id", function(req,res){
  Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log("Error deleting blog");
    }
    else{
      // res.send("Delete route is reached");
      res.redirect("/blogs");
    }
  });
});






// SERVER PORT

app.listen(80,()=>{

  console.log("Server Started.......");
})