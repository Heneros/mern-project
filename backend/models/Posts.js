const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "must provide title"],
    },
    imageUrl: {
      type: String,
      required: [true, "must insert image"],
    },
    tag: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: [true, "must provide category"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
