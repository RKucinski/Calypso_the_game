const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MapSchema = new Schema({

  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user_profiles',
    required: true
  },
  name: {
    type: String,
    required: [true, "Map title required"]
  },
  picture: {
    type: String,
    required: true,
    default: ""
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  },
  dislikes: {
    type: Number,
    required: true,
    default: 0
  },
  description: {
    type: String,
    required: true,
    default: "Oseras-tu explorer cet endroit ?"
  },
  difficulte: {
    type: Number,
    required: true,
    default: 0
  },
  type: {
    type: String,
    required: true,
    default: "normal"
  },

});

const Map = mongoose.model('maps', MapSchema);

module.exports = Map;