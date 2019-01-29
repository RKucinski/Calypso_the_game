const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

  idMap: {
    type: String,
    required: false
  },
  userID: {
    type: String,
    required: false
  },
  userPseudo: {
    type: String,
    required: true
  },
  userAvatar: {
    type: String,
    required: false,
    default: ""
  },
  comment: {
    type: String,
    required: true
  },
},{  timestamps: { createdAt: 'created_at' }
})

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;