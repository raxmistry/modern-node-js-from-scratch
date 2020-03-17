const path = require('path')
const express = require('express')

const app = new express()
 
app.get('/', (request, response) => { 
    response.sendFile(path.resolve(__dirname, 'index.html'))
})


app.get('/about', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'about.html'))
})

app.get('/contact', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'contact.html'))
})

app.listen(3000, () => {
    console.log("Server started on port 3000")
})


