const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  message: [
    {
      content: { type: String, max: 2000, required: true },
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  timestamp: true,
});

module.exports = mongoose.model("Chat", chatSchema);
