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

// Middleware Hook: for handling primary key deletion cause all reference deletion
/*
$in - is a query operator which checks a perticular element is in the list
or not
*/
UserSchema.pre('remove', function(next) {
    const Blogs = mongoose.model('blogs');
    const Comments = mongoose.model('comments');
    Blogs.remove({ _id: {$in: this.blogs}})
     .then(() => {
       Comments.remove({ author: {$in: [this._id]}})
        .then(() => next());
     });
});

// Model
const User = mongoose.model('users', UserSchema);

// export
module.exports = User;
