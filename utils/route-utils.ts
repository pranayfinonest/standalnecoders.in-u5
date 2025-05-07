// Define cybersecurity subpaths that should not be treated as city pages
export const CYBERSECURITY_SUBPATHS = [
  "vulnerability-assessment",
  "firewall-ids",
  "encryption",
  "risk-assessment",
  "application-security",
  "code-review",
  "cloud-security",
  "ransomware-protection",
  "assessments",
  "network-cyber-threat-intelligence",
  "data-security",
  "iso-certification-compliance",
  "privacy-cybersecurity",
  "training-awareness",
  "managed-security-services",
  "specialized-security-solutions-incident-response",
]

/**
 * Checks if a path is a valid cybersecurity subpath
 */
export function isValidCybersecuritySubpath(path: string): boolean {
  return CYBERSECURITY_SUBPATHS.includes(path)
}

/**
 * Checks if a path is the main cybersecurity page
 */
export function isMainCybersecurityPage(path: string): boolean {
  return path === "/services/cybersecurity" || path === "/services/cybersecurity/"
}

/**
 * Extracts the subpath from a full URL path
 * e.g., /services/cybersecurity/vulnerability-assessment -> vulnerability-assessment
 */
export function extractSubpath(fullPath: string): string {
  const parts = fullPath.split("/").filter(Boolean)
  return parts.length >= 3 ? parts[2] : ""
}
