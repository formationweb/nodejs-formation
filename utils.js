import fs from 'fs/promises'
import path from 'path'

const dir = await fs.readdir('node_modules', {
    recursive: true
})

const stat = await fs.stat('node_modules')

console.log(stat.isDirectory())

const ext = path.extname('serve.js')

console.log(ext)

//  fs.mkdir('test/foo', { recursive: true })