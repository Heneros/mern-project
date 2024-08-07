const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
    content: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: [true, "must insert image"],
    },
    comments: [commentSchema],
    tag: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: [true, "must provide category"],
      validate: {
        validator: function (value) {
          return value.toLowerCase().split(",").length === 1;
        },
        message: "Category must contain only one value",
      },
    },
    views: {
      type: Number,
      default: 0,
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

postSchema.methods.incrementViews = async function () {
  this.views += 1;
  await this.save();
};
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
