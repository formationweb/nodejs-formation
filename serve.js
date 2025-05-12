import fs from "fs";

export function serveHtml() {
  return new Promise((resolve, reject) => {
    fs.readFile("index.html", "utf-8", (err, content) => {
        if (err) reject(err)
        else resolve(content)
    });
  })
}
