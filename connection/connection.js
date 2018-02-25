// load mongoose
const mongoose = require('mongoose');

// assign global promises to mongoose
mongoose.Promises = global.Promises;

// connect with mongoDB
mongoose.connect('mongodb://localhost:27017/blogs');

// check connection
before(done => {
  mongoose.connection
   .once('open', () => {})
   .on('error', (err) => {
     console.warn(err);
   });
});

// drop all collection before new test cases
