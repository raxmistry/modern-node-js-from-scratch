const express = require('express')
const path = require('path')
const {config, engine} = require('express-edge')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Post = require('./database/models/Post')
const fileupload = require('express-fileupload')
const app = new express()
const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')

mongoose.connect('mongodb://localhost/node-js-blog')

app.use(fileupload())

config({ cache: process.env.NODE_ENV === 'production' });

app.use(express.static('public'))

app.use(engine);
app.set('views', `${__dirname}/views`);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const validateCreatePostMiddleware = (req, res, next) => {

    if (!req.files || !req.files.image || !req.body.username ||
    !req.body.title || !req.body.subtitle || !req.body.content) {
        return res.redirect('/posts/new')
    }
    next()
}

app.use('/posts/store', validateCreatePostMiddleware)

app.get('/', homePageController)

app.get('/posts/new', createPostController)

app.post('/posts/store', storePostController)

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
