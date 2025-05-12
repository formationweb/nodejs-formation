import fs from 'node:fs/promises'
import path from 'node:path'
import markdown from 'markdown-it'

const dirname = import.meta.dirname
const md = markdown()

async function processDirectory(dir, outputDir) {
    const publicDir = path.join(dirname, outputDir, 'public')

    await fs.mkdir(
        publicDir,
        { recursive: true }
    )

    const files = await fs.readdir(dir, { recursive: true })
    for (let pathFile of files) {
        const inputFile = path.join(dirname, dir, pathFile)
        const pathInfo = await fs.stat(inputFile)
        if (pathInfo.isDirectory()) {
            const outputDirPath = path.join(dirname, outputDir, pathFile)
            await fs.mkdir(outputDirPath, { recursive: true })
        }
        else {
            const ext = path.extname(inputFile)
            if (ext == '.md') {
                const content = await fs.readFile(inputFile, 'utf-8')
                const html = md.render(content)
                const outputFilePath = path.join(dirname, outputDir, pathFile.replace(/\.md$/, '.html'))
                await fs.writeFile(outputFilePath, html)
            }
            else if (['.png', '.jpg', '.jpeg', '.svg'].includes(ext)) {
                const outputFilePath = path.join(publicDir, path.basename(pathFile))
                await fs.copyFile(inputFile, outputFilePath)
            }
        }
    }
}

const agrv = process.argv
const inputDir = agrv[2]
const outputDir = agrv[3] ?? 'dist'

await processDirectory(inputDir, outputDir)