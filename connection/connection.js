// load mongoose
const mongoose = require('mongoose');

// assign global promises to mongoose
mongoose.Promises = global.Promises;

// connect with mongoDB
mongoose.connect('mongodb://localhost:27017/blogs');

// check connection
before(done => {
  mongoose.connection
   .once('open', () => done())
   .on('error', (err) => {
     console.warn(err);
   });
});

// drop all collection before new test cases

beforeEach(done => {
  const {blogs, comments, users} = mongoose.connection.collections;
  users.drop()
   .then(() => {
     comments.drop()
      .then(() => {
        blogs.drop()
         .then(() => {
           done();
         });
      });
   });
});

module.exports = mongoose;
