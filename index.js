import http from 'http'
import fs from 'fs'
import path from 'path'
import { serveHtml } from './serve.js'

const dirname = import.meta.dirname
const argv = process.argv
const port = +argv[2] ?? 3000

const server = http.createServer(async (req, res) => {
    if (req.url == '/') {
        // serveHtml().then((content) => {
        //     res.writeHead(200, {
        //         'content-type': 'text/html'
        //     })
        //     res.end(content)
        // })
        const content = await serveHtml()
        res.writeHead(200, {
            'content-type': 'text/html'
        })
        res.end(content)
    }
    else {
        res.statusCode = 404
        res.end('Erreur 404')
    }
})

server.listen(port, () => {
    console.log('le serveur démarre sur le port', port)
})