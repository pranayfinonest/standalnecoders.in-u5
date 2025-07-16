const fs = require("fs")
const path = require("path")

function findFiles(startPath, filter, callback) {
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath)
    return
  }

  const files = fs.readdirSync(startPath)
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i])
    const stat = fs.lstatSync(filename)
    if (stat.isDirectory()) {
      findFiles(filename, filter, callback) //recurse
    } else if (filter.test(filename)) {
      callback(filename)
    }
  }
}

const pagesDir = path.join(__dirname, "../src/app")

findFiles(pagesDir, /\.tsx?$/, (file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${file}:`, err)
      return
    }

    if (data.includes("useSearchParams")) {
      if (file.includes("next.config.js") || file.split("/").length === 1) return
      console.warn(`[WARN] useSearchParams detected in ${file}. Ensure it's used within a 'use client' directive.`)
    }
  })
})
