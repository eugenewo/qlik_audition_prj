const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    isPalindrome: { type: Boolean, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Message", messageSchema);