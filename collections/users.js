const mongoose = require('./../connection/connection');
const Schema = mongoose.Schema;

// Schema Set Up
const UserSchema = new Schema({
  fName: String,
  lName: String,
  email: String,
  blogs: [{
    type: Schema.Types.ObjectId,
    ref: 'blogs'
  }]
});

// Virtual Schema
UserSchema.virtual('totalBlogs').get(function() {
  return this.blogs.length;
});

// Model
const User = mongoose.model('users', UserSchema);

// export
module.exports = User;
