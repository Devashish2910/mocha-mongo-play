const User = require('./../collections/users');
const Blog = require('./../collections/blogs');
const Comment = require('./../collections/comments');
const assert = require('assert');

describe('REMOVE', () => {
  let deva, blog, comment;
  beforeEach(done => {
    deva = new User({fName: 'Devashish', lName: 'Patel', email: 'dgpatel2910@gmail.com'});
    pk = new User({fName: 'PK', lName: 'Patel', email: 'PK@gmail.com'});
    blog = new Blog({title: "My first blog", content: 'Welcome to my blog', likes: 0});
    comment = new Comment({content: 'My first comment'});

    deva.blogs.push(blog);
    blog.author = deva;
    blog.comments.push(comment);
    comment.blog = blog;
    comment.author = deva;

    Promise.all([deva.save(), blog.save(), comment.save(), pk.save()])
     .then(() => {
       done();
     });
  });

  xit('Remove User Pre Hook Test', done => {
    User.findOne({fName: 'Devashish'})
     .then((res) => {
       res.remove(() => {
         done();
       })
     });
  });
});
