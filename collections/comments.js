const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: 'blogs'
  }
});

const Comment = mongoose.model('comments', CommentSchema);

module.exports = Comment;
