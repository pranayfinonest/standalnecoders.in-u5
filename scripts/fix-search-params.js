const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

// Directories to exclude
const excludeDirs = ["node_modules", ".next", ".git", "public", "scripts"]

// Function to check if a file contains useSearchParams
function checkFileForUseSearchParams(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8")
    return content.includes("useSearchParams")
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return false
  }
}

// Function to fix a file with useSearchParams
function fixFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8")

    // Check if it's already a client component
    const isClientComponent = content.includes("'use client'") || content.includes('"use client"')

    // Check if it's using useSearchParams
    const hasUseSearchParams = content.includes("useSearchParams")

    if (hasUseSearchParams) {
      // If it's not a client component, we need to create one
      if (!isClientComponent) {
        console.log(`File ${filePath} needs to be converted to a client component`)

        // Get the file name without extension
        const fileName = path.basename(filePath, path.extname(filePath))

        // Create a new client component file
        const dirName = path.dirname(filePath)
        const newFilePath = path.join(dirName, `${fileName}-client.tsx`)

        // Add 'use client' directive
        content = `'use client'\n\n${content}`

        // Write the client component
        fs.writeFileSync(newFilePath, content)

        // Update the original file to use the client component
        const newContent = `import { Suspense } from "react"
import ${fileName.charAt(0).toUpperCase() + fileName.slice(1)}Client from "./${fileName}-client"

export default function ${fileName.charAt(0).toUpperCase() + fileName.slice(1)}() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <${fileName.charAt(0).toUpperCase() + fileName.slice(1)}Client />
    </Suspense>
  )
}`

        fs.writeFileSync(filePath, newContent)

        console.log(`Created client component ${newFilePath} and updated ${filePath}`)
      } else {
        // It's already a client component, just make sure it's wrapped in Suspense
        console.log(`File ${filePath} is already a client component, checking for Suspense`)

        // Check if it's already wrapped in Suspense
        const hasSuspense = content.includes("<Suspense")

        if (!hasSuspense) {
          console.log(`Adding import for Suspense in ${filePath}`)

          // Add Suspense import if needed
          if (content.includes("import { ")) {
            content = content.replace("import { ", "import { Suspense, ")
          } else if (content.includes("import React")) {
            content = content.replace("import React", "import React, { Suspense }")
          } else {
            content = `import { Suspense } from 'react'\n${content}`
          }

          // Find the component's return statement and wrap it in Suspense
          // This is a simplified approach and might need manual adjustment
          content = content.replace(/return\s*\(\s*</, "return (\n    <Suspense fallback={<div>Loading...</div>}><")

          // Find the closing tag of the component's return
          content = content.replace(/>\s*\)\s*$/, "></Suspense>\n  )\n")

          fs.writeFileSync(filePath, content)
          console.log(`Added Suspense wrapper to ${filePath}`)
        }
      }
    }
  } catch (error) {
    console.error(`Error fixing file ${filePath}:`, error)
  }
}

// Function to recursively scan directories
function scanDirectory(dir) {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      if (!excludeDirs.includes(file)) {
        scanDirectory(filePath)
      }
    } else if (
      stat.isFile() &&
      (filePath.endsWith(".tsx") || filePath.endsWith(".jsx") || filePath.endsWith(".ts") || filePath.endsWith(".js"))
    ) {
      if (checkFileForUseSearchParams(filePath)) {
        console.log(`Found useSearchParams in ${filePath}`)
        fixFile(filePath)
      }
    }
  }
}

// Main function
function main() {
  console.log("Scanning for useSearchParams...")
  scanDirectory(".")
  console.log("Scan complete!")
}

main()
