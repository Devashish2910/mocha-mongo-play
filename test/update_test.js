const User = require('./../collections/users');
const Blog = require('./../collections/blogs');
const Comment = require('./../collections/comments');
const assert = require('assert');

describe('UPDATE', () => {
  let deva, blog, comment;
  beforeEach(done => {
    deva = new User({fName: 'Devashish', lName: 'Patel', email: 'dgpatel2910@gmail.com'});
    blog = new Blog({title: "My first blog", content: 'Welcome to my blog', likes: 0});
    comment = new Comment({content: 'My first comment'});

    deva.blogs.push(blog);
    blog.author = deva;
    blog.comments.push(comment);
    comment.blog = blog;
    comment.author = deva;

    Promise.all([deva.save(), blog.save(), comment.save()])
     .then(() => {
       done();
     });
  });

  it('Increase Likes', done => {
    Blog.findByIdAndUpdate(blog._id, {$inc: {likes: 1}})
     .then(res => {
       Blog.findById(blog._id)
        .then(res => {
          assert(res.likes === (blog.likes + 1))
          done();
        })
     });
  });
});
