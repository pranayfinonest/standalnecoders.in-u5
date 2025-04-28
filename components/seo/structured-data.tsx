interface StructuredDataProps {
  type: "Organization" | "WebSite" | "Service" | "BreadcrumbList" | "FAQPage" | "Product"
  data: any
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
