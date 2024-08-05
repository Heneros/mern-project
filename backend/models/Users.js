const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { USER } = require("../constants/index.js")
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
    },
    passwordConfirm: {
      type: String,
      validate: {
        validator: function (value) {
          return value === this.password
        },
        message: "Passwords dont match"
      }
    },
    isEmailVerified: { type: Boolean, required: true, default: false },
    googleId: {
      type: String,
      unique: true,
      sparse: true, 
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isEditor: {
      type: Boolean,
      required: true,
      default: false,
    },
    roles: {
      type: [String],
      default: [USER]
    },
    provider: {
      type: String,
      required: true,
      default: "email"
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    refreshToken: [String]
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;

});

const User = mongoose.model("User", userSchema);
module.exports = User;
