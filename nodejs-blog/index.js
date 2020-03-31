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
const aboutPageController = require('./controllers/aboutPage')
const singlePostController = require('./controllers/singlePost')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')

mongoose.connect('mongodb://localhost/node-js-blog')

app.use(fileupload())

config({ cache: process.env.NODE_ENV === 'production' });

app.use(express.static('public'))

app.use(engine);
app.set('views', `${__dirname}/views`);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const storePostMiddleware = require('./middleware/storePost')

app.use('/posts/store', storePostMiddleware)

app.get('/', homePageController)

app.get('/auth/register', createUserController)

app.post('/users/register', storeUserController)

app.get('/posts/new', createPostController)

app.post('/posts/store', storePostController)

app.get('/about', aboutPageController)

app.get('/post/:id', singlePostController)

app.get('/contact', (req, res) => {
    res.render('contact')
})
app.listen(4000, () => {
    console.log("Server started on port 4000")

})
