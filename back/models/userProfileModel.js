const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserProfileSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    default: "",
    required: false,
  },
  lastname: {
    type: String,
    default: "",
    required: false,
  },
  pseudo: {
    type: String,
    unique: true,
    required: false,
  },
  birthday: {
    type: String,
    required: false,
  },
  avatar_id: {
    type: String,
    required: false,
  },
  gold: {
    type: Number,
    required: false,
    default: 0,
  },
});

const UserProfile = mongoose.model("user_profiles", UserProfileSchema);

module.exports = UserProfile;
