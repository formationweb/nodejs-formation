import http from 'http'
import fs from 'fs'

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        res.end('<h1>test</h1>')
    }
   
})

server.listen(3000, () => {
    console.log('le serveur démarre sur le port', 3000)
})