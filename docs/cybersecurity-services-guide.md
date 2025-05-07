# Cybersecurity Services Pages Development Guide

This guide explains how to create the detailed service pages for all cybersecurity services listed in the main cybersecurity-services.tsx component.

## Template Structure

All service pages should use the `CybersecurityServiceTemplate` component which provides a consistent structure including:

- Hero section with service title, subtitle, description and category identification
- Key benefits section
- Features section
- Process steps
- FAQs
- Case studies (optional)
- Pricing options (optional)
- Related services

## Steps to Create a New Service Page

1. Create a new file at `app/services/cybersecurity/[service-name]/page.tsx`
2. Import the required components:
   \`\`\`tsx
   import type { Metadata } from "next"
   import { [IconName] } from "lucide-react"
   import CybersecurityServiceTemplate from "@/components/services/cybersecurity-service-template"
   \`\`\`
3. Set up the metadata for SEO:
   \`\`\`tsx
   export const metadata: Metadata = {
     title: "[Service Name] | StandaloneCoders",
     description: "[Detailed service description for SEO]",
     keywords: "[comma,separated,keywords]",
   }
   
   // Force static generation for this page
   export const dynamic = "force-static"
   \`\`\`
4. Implement the page component following the pattern in the example pages
5. Fill in all required props for the template:
   - title, subTitle, description
   - icon (from Lucide icons)
   - categoryName and categoryColor (based on the service category)
   - benefits, features, process, faqs arrays
   - caseStudies and pricing arrays (optional)
   - relatedServices array

## Category Colors

Use these color values for different service categories:

- Security Assessments & Audits: `red`
- Network Security Services: `blue`
- Cyber Threat Intelligence & Incident Response: `yellow`
- Data Security & Privacy: `green`
- ISO Certification & Compliance Services: `purple`
- Cybersecurity Training & Awareness: `indigo`
- Managed Security Services: `orange`
- Specialized Security Solutions: `cyan`

## Common Content Elements

When creating service pages, include these typical elements:

1. **Benefits**: 4-5 key advantages of the service
2. **Features**: 5-6 specific capabilities or components
3. **Process**: 5-8 step-by-step implementation approach
4. **FAQs**: 5-6 common questions with detailed answers
5. **Case Studies**: 1-2 real-world examples (industry, challenge, solution, result)
6. **Pricing**: 3 tiers (basic, comprehensive, enterprise)
7. **Related Services**: 4-5 related cybersecurity services

## Example Structure

\`\`\`tsx
export default function ServiceNamePage() {
  return (
    <CybersecurityServiceTemplate 
      title="Service Name"
      subTitle="Brief service tagline"
      description="Detailed service description explaining value and approach."
      icon={<Icon className="h-6 w-6 text-white" />}
      categoryName="Category Name"
      categoryColor="color"
      heroImage="/placeholder.svg?height=800&width=1200&query=relevant search query"
      benefits={[...]}
      features={[...]}
      process={[...]}
      faqs={[...]}
      caseStudies={[...]}
      pricing={[...]}
      relatedServices={[...]}
    />
  )
}
\`\`\`

Refer to the example pages for detailed implementation patterns.
