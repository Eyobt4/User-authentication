const mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    token:String,
    expiresAt:Date,
});

module.exports = mongoose.model("Session",sessionSchema);