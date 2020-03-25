const mongoose = require('mongoose')

const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node-js-test-blog')

//Post.create({
//    title: "My first blog post",
//    description: "Blog post description",
//    content: "some stuff"
//}, (error, post) => {
//    console.log(error, post)
//})
//

Post.find({
    title: 'My first blog post'
}, (error, posts) => {
    console.log(error, posts)
})
