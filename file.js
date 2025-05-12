import fs from 'fs/promises'

const content = await fs.readFile('index.html', 'utf-8')

console.log(content)