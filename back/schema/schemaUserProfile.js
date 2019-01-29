const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require("../config/config");

var userProfileSchema = mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true
    },
    firstname: {
      type: String,
      required: false
    },
    lastname: {
      type: String,
      required: false
    },
    pseudo: {
      type: String,
      required: false
    },
    birthday: {
      type: String,
      required: false
    },
    gold: {
      type: Number,
      required: false
    },
    avatar_id: {
      type: Number,
      required: false
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

userProfileSchema.methods = {
  authenticate: function(password) {
    return passwordHash.verify(password, this.password);
  },
  getToken: function() {
    return jwt.encode(this, config.secret);
  }
};

module.exports = mongoose.model("User_Profiles", userProfileSchema);
