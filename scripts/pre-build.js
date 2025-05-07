const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

console.log("🔍 Running pre-build checks...")

// Check for useSearchParams without Suspense
console.log("Checking for useSearchParams issues...")
try {
  // Run the fix script
  execSync("node scripts/fix-search-params.js", { stdio: "inherit" })
  console.log("✅ Fixed useSearchParams issues")
} catch (error) {
  console.error("❌ Failed to fix useSearchParams issues:", error)
  process.exit(1)
}

// Add more pre-build checks here if needed

console.log("✅ Pre-build checks completed successfully")
