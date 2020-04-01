const express = require('express')
const path = require('path')
const {config, engine} = require('express-edge')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Post = require('./database/models/Post')
const fileupload = require('express-fileupload')
const app = new express()
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')
const connectFlash = require('connect-flash')

const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const aboutPageController = require('./controllers/aboutPage')
const singlePostController = require('./controllers/singlePost')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')

const mongoStore = connectMongo(expressSession)

app.use(expressSession({ 
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection : mongoose.connection
    })
 }))

mongoose.connect('mongodb://localhost/node-js-blog')

app.use(connectFlash())

app.use(fileupload())

config({ cache: process.env.NODE_ENV === 'production' });

app.use(express.static('public'))

app.use(engine);
app.set('views', `${__dirname}/views`);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const storePostMiddleware = require('./middleware/storePost')
const auth = require('./middleware/auth')


app.get('/', homePageController)

app.get('/auth/register', createUserController)

app.get('/auth/login', loginController)

app.post('/users/register', storeUserController)

app.post('/users/login', loginUserController)

app.get('/posts/new', auth, createPostController)

app.post('/posts/store', auth, storePostMiddleware, storePostController)

app.get('/about', aboutPageController)

app.get('/post/:id', singlePostController)

app.get('/contact', (req, res) => {
    res.render('contact')
})
app.listen(4000, () => {
    console.log("Server started on port 4000")

})
