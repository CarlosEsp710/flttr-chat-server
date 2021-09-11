const { response } = require("express");
const Message = require("../models/message");

const getChat = async (req, res = response) => {
  const myID = req.uid;
  const messageFrom = req.params.from;

  const messages = await Message.find({
    $or: [
      { from: myID, for: messageFrom },
      { from: messageFrom, for: myID },
    ],
  }).sort({ createdAt: "desc" });

  res.json({
    ok: true,
    messages: messages,
  });
};

module.exports = {
  getChat,
};
