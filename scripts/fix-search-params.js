/**
 * This script can be used to find all instances of useSearchParams
 * in the codebase and suggest fixes.
 *
 * To run: node scripts/fix-search-params.js
 */

const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

// Find all files that use useSearchParams
console.log("Finding files with useSearchParams...")
const files = execSync('grep -r "useSearchParams" --include="*.tsx" --include="*.ts" app components')
  .toString()
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split(":")[0])

console.log(`Found ${files.length} files using useSearchParams`)

files.forEach((file) => {
  console.log(`\nChecking ${file}...`)
  const content = fs.readFileSync(file, "utf8")

  // Check if the file is already using our safe utility
  if (content.includes("getClientSearchParams")) {
    console.log("✅ Already using safe utility")
    return
  }

  // Check if the file has "use client"
  if (!content.includes('"use client"')) {
    console.log('❌ Missing "use client" directive')
  }

  // Check if the component is wrapped in Suspense
  if (!content.includes("<Suspense") && !content.includes("fallback={")) {
    console.log("❌ Not wrapped in Suspense")
  }

  console.log("Suggested fix:")
  console.log('1. Add "use client" at the top of the file')
  console.log('2. Import { getClientSearchParams } from "@/utils/client-navigation"')
  console.log("3. Replace useSearchParams() with getClientSearchParams()")
  console.log("4. Wrap the component in a Suspense boundary in its parent")
})

console.log("\nDone!")
