const mongoose = require("mongoose");


const accountSchema = new mongoose.Schema({
    accountName : String,
    accountUserName : String,
    accountPassword : String
});

const AccountDetails = mongoose.model("AccountDetails", accountSchema);

module.exports = AccountDetails;