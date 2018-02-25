const User = require('./../collections/users');
const Blog = require('./../collections/blogs');
const Comment = require('./../collections/comments');
const assert = require('assert');

describe('CREATE', () => {
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

  xit('Create Blog', done => {
    User.findOne({_id: deva._id})
     .populate({path: 'blogs'})
     .then(res => {
       //console.log(res);
       assert(res.blogs[0].title === "My first blog");
       done();
     })
  });

});

//{path:'blogPosts',populate:{path:'comments',populate:{path:'user'}}}
