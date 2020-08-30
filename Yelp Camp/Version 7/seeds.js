const mongoose = require("mongoose"),
      Campground = require("./models/campground"),
      Comment   =  require("./models/comment");



let data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
];

////////////////////////////   MODERN APROACH



async function seedDB(){
    try {
        await Campground.deleteMany({});
        console.log("Cleared all Campgrounds");
        await Comment.deleteMany({});
        console.log("Cleared all Comments");

        for(seed of data){

            let newCampground = await Campground.create(seed);
            console.log("Campground Created");
            let newComment = await Comment.create({author:"Nikhil", text: "New comment from seed"});
            console.log("Comment Created");

            newCampground.comments.push(newComment);
            newCampground.save();
            console.log("Comment added to campground");
        
        }
        
    } catch (err) {
        console.log(err);
    }
}




//////////////////////////////////////////////////////////////////   OLD APROACH


// function seedDB(){
    // Comment.deleteMany({},function(err){
    //     if(err){
    //         console.log(err);
    //     }
    // });
    //     Campground.deleteMany({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("All data removed");
//             data.forEach(seed => {
//                 Campground.create(seed,function(err, newCampground){
//                     if(err){
//                         console.log(err);
//                     }
//                     else{
//                         console.log("Campground created");

//                         Comment.create(
//                             {
//                                 author : "Nikhil",
//                                 text : "Comment from seed is added"
//                             }, function(err, newComment){
//                                 if(err){
//                                     console.log(err);
//                                 }
//                                 else{
//                                     newCampground.comments.push(newComment);
//                                     newCampground.save();
//                                     console.log("Comment Added");
//                                 }
//                             });
//                     }
//                 });
//             });
//         }
//     });
// }




module.exports = seedDB;