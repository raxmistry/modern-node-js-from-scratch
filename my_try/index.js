const http = require('http')
const fs = require('fs')

const aboutPage = fs.readFile('about.html')
const contactPage = fs.readFile('contact.html')
const homePage = fs.readFile('index.html')

const server = http.createServer((request, response) => {
    console.log(request.url)

    if (request.url === '/') {
        response.end(homePage)
    } else if (request.url === '/about') {
        response.end(aboutPage)
    } else if (request.url === '/contact') {
        response.end(contactPage)
    } else {
        response.writeHead(404)
        response.end("Page not found")
    }
    
})

server.listen(3000)
