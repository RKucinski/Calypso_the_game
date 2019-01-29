const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreatorSchema = new Schema({

  userID: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true,
    default: 0
  },
  inventaire_maps: {
    type: [String],
    required: true,
    default: []
  },
  inventaire_assets: {
    type: [String],
    required: true,
    default: []
  }

});

const Creator = mongoose.model('creator', CreatorSchema);

module.exports = Creator;