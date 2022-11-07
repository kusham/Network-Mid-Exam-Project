const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const commentModel = mongoose.model("comments", commentSchema);

module.exports = commentModel;
