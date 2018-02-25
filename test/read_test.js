const User = require('./../collections/users');
const Blog = require('./../collections/blogs');
const Comment = require('./../collections/comments');
const assert = require('assert');

describe('CREATE', () => {
  let deva, blog, comment, d, e, v, a;
  beforeEach(done => {
    deva = new User({fName: 'Devashish', lName: 'Patel', email: 'dgpatel2910@gmail.com'});
    d = new User({fName: 'D', lName: 'Patel', email: 'd@gmail.com'});
    e = new User({fName: 'E', lName: 'Patel', email: 'e@gmail.com'});
    v = new User({fName: 'V', lName: 'Patel', email: 'v@gmail.com'});
    a = new User({fName: 'A', lName: 'Patel', email: 'a@gmail.com'});

    blog = new Blog({title: "My first blog", content: 'Welcome to my blog', likes: 0});
    comment = new Comment({content: 'My first comment'});

    deva.blogs.push(blog);
    blog.author = deva;
    blog.comments.push(comment);
    comment.blog = blog;
    comment.author = deva;

    Promise.all([deva.save(), blog.save(), comment.save(), d.save(), e.save(), v.save(), a.save()])
     .then(() => {
       done();
     });
  });

  xit('Nested Populate', done => {
    User.findOne({fName: 'Devashish'})
     .populate({
       path: 'blogs',
       populate: {
         path: 'author',
         model: 'users',
         path: 'comments',
         model: 'comments',
         populate: {
           path: 'author',
           model: 'users'
         }
       }
     })
     .then(res => {
       assert(res.blogs[0].comments[0].author.fName === 'Devashish')
       done();
     })
  });

  it.only('Pagination', done => {
    User.find({})
     .sort({fName: -1})
     .skip(0)
     .limit(4)
     .then(res => {
       console.log(res);
       done();
     })
  });
});
