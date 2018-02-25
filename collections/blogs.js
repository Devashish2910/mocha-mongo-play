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

BlogSchema.pre('remove', function(next) {
  const Comments = mongoose.require('comments');
  Comments.remove({_id: {$in: this.comments}})
   .then(() => next());
});
const Blog = mongoose.model('blogs', BlogSchema);

module.exports = Blog;
