const mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");




const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    accountDetails : [
        {
                type: mongoose.Schema.Types.ObjectId,
                ref: "AccountDetails"   
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", UserSchema);


module.exports = User;