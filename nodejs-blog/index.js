const express = require('express')
const path = require('path')
const {config, engine} = require('express-edge')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Post = require('./database/models/Post')
const fileupload = require('express-fileupload')
const app = new express()

mongoose.connect('mongodb://localhost/node-js-blog')

app.use(fileupload())

config({ cache: process.env.NODE_ENV === 'production' });

app.use(express.static('public'))

app.use(engine);
app.set('views', `${__dirname}/views`);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', async(req, res) => {

    const posts = await Post.find({})
    console.log(posts)
    res.render('index', {
        posts
    })
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post('/posts/store', (req, res) => {
    const { image } = req.files
    image.mv(path.resolve(__dirname, 'public/posts/', image.name), (error) => {
        Post.create({ 
            ...req.body, 
            image: `/posts/${image.name}`
        } , (error, post) => {
            res.redirect('/')
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/post/:id', async(req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
})

app.get('/contact', (req, res) => {
    res.render('contact')
})
app.listen(4000, () => {
    console.log("Server started on port 4000")

})
