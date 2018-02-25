const mongoose = require('./../connection/connection');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: String,
  content: String,
  likes: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comments'
  }]
});

BlogSchema.virtual('totalComments').get(function() {
  return this.comments.length;
});

const Blog = mongoose.model('blogs', BlogSchema);

module.exports = Blog;
