const express = require('express')
const path = require('path')
const {config, engine} = require('express-edge')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Post = require('./database/models/Post')
const app = new express()

mongoose.connect('mongodb://localhost/node-js-blog')

config({ cache: process.env.NODE_ENV === 'production' });

app.use(express.static('public'))

app.use(engine);
app.set('views', `${__dirname}/views`);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/posts/new', (req, res) => {
    res.render('create')
})

app.post('/posts/store', (req, res) => {

    Post.create(req.body, (error, post) => {
        res.redirect('/')
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/post', (req, res) => {
    res.render('post')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})
app.listen(4000, () => {
    console.log("Server started on port 4000")

})
