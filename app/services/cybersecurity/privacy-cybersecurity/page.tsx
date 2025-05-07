import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Privacy & Cybersecurity | StandaloneCoders",
  description: "Comprehensive privacy protection and regulatory compliance solutions",
  keywords: "privacy, data protection, GDPR, CCPA, privacy compliance, privacy impact assessment",
}

export default function PrivacyCybersecurityPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-2xl p-8 md:p-12 mb-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/abstract-geometric-shapes.png"
            alt="Privacy & Cybersecurity"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
            Security Services
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Privacy & Cybersecurity</h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-6">
            Protect personal data and ensure regulatory compliance
          </h2>
          <p className="text-lg mb-8">
            Our privacy and cybersecurity services help organizations protect personal data, comply with privacy
            regulations, and build trust with customers.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild className="bg-white text-purple-900 hover:bg-gray-100">
              <Link href="/contact">Get a Free Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
              <Link href="#services">Explore Services</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="services" className="mb-16 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Privacy Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Privacy Program Development</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Build a comprehensive privacy program that aligns with your business objectives and regulatory
                requirements.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>GDPR Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Ensure compliance with the European Union's General Data Protection Regulation (GDPR).
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Data Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Implement technical and organizational measures to protect personal data from breaches and unauthorized
                access.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Privacy Impact Assessments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Evaluate the privacy impacts of new projects, systems, or processes to identify and mitigate risks.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Data Breach Response</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Develop and implement data breach response plans to ensure timely and effective management of privacy
                incidents.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Privacy Training</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Educate your staff on privacy principles, data protection best practices, and regulatory requirements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Enhance Your Privacy Posture</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Contact our privacy experts today to discuss your privacy and compliance needs and get started with our
          services.
        </p>
        <Button asChild size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
          <Link href="/contact">Contact Us Now</Link>
        </Button>
      </div>
    </div>
  )
}
