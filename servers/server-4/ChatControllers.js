const ChatModel = require("./ChatModel");

module.exports.createChat = async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    res
      .status(200)
      .json({
        success: true,
        message: "chat is created successfully",
        result: result,
      });
  } catch (error) {
    res
    .status(400)
    .json({
      success: false,
      message: "chat is not created",
      error: error.message,
    });
  }
};

module.exports.userChats = async (req, res) => {
  console.log("userChat");
    try {
      const chat = await ChatModel.find({
        members: { $in: [req.params.userId] },
      });
      res
      .status(200)
      .json({
        success: true,
        message: "chats are found successfully",
        chat: chat,
      });
    } catch (error) {
        res
        .status(400)
        .json({
          success: false,
          message: "chats are not found",
          error: error.message,
        });
    }
  };

  module.exports.findChat = async (req, res) => {
    try {
      const chat = await ChatModel.findOne({
        members: { $all: [req.params.firstId, req.params.secondId] },
      });
      res
        .status(200)
        .json({
          success: true,
          message: "chat is found",
          chat: chat,
        });
    } catch (error) {
        res
        .status(400)
        .json({
          success: false,
          message: "chat is not found",
          error: error.message,
        });
    }
  };
