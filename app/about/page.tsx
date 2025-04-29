import AboutUs from "@/components/about-us"
import type { Metadata } from "next"

// Force static generation
export const dynamic = "force-static"

// Add metadata for SEO
export const metadata: Metadata = {
  title: "About Us | StandaloneCoders",
  description:
    "Learn about StandaloneCoders, our mission, team, and approach to web development and technology solutions.",
}

export default function AboutPage() {
  return <AboutUs />
}
