const express = require("express");
const router = express.Router();
const { Chat } = require("../models/chat");

// String.prototype.toObjectId = function() {
//   var ObjectId = (require('mongoose').Types.ObjectId);
//   return new ObjectId(this.toString());
// };

router.post("/", async (req, res) => {
  try {
    let chat = new Chat({
      who: req.body.who,
      content: req.body.content,
      user: req.body.user,
    });
    console.log("chat", chat);
    chat = await chat.save();

    if (!chat) {
      return res.status(404).send("The chat cannot be created!");
    }
    return res.status(200).send({ success: true, data: chat });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

router.get("/:id", async (req, res) => {
  var ObjectId = require("mongoose").Types.ObjectId;
  var query = { user: new ObjectId(req.params.id) };
  try {
    const chat = await Chat.find(query);
    if (!chat) {
      return res
        .status(404)
        .json({ success: false, message: "chat not found" });
    }
    return res.status(200).send({ success: true, data: chat });
  } catch ({ message }) {
    return res.status(500).json({ success: false, message: message });
  }
});

module.exports = router;
