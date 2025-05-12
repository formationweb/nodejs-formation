import fs from 'fs'

fs.readFile('index.html', 'utf-8', (err, content) => {
    console.log(content)
})
