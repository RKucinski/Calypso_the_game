const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EquipmentSchema = new Schema({
  case_1: {
    type: String,
    default: "",
    required: true
  },
  case_2: {
    type: String,
    default: "",
    required: true
  },
  case_3: {
    type: String,
    default: "",
    required: true
  },
  case_4: {
    type: String,
    default: "",
    required: true
  },
})

const PlayerSchema = new Schema({

  userID: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  equipement: EquipmentSchema,
  inventaire_objets: {
    type: [String],
    required: true,
    default: []
  }
});

const Player = mongoose.model('player', PlayerSchema);

module.exports = Player;