const express = require('express')
const path = require('path')
const {config, engine} = require('express-edge')

const app = new express()

config({ cache: process.env.NODE_ENV === 'production' });

app.use(express.static('public'))

app.use(engine);
app.set('views', `${__dirname}/views`);



app.get('/', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/index.html'))
    res.render('')
})

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'))
})

app.get('/post', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'))
})

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
})
app.listen(4000, () => {
    console.log("Server started on port 4000")

})
