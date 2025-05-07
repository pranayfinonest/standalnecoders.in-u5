import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Data Security Services | StandaloneCoders",
  description: "Protect your sensitive data with our comprehensive data security services",
  keywords: "data security, data protection, encryption, data loss prevention, database security",
}

export default function DataSecurityPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 rounded-2xl p-8 md:p-12 mb-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/abstract-geometric-shapes.png"
            alt="Data Security"
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Data Security</h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-6">Protect your most valuable digital assets</h2>
          <p className="text-lg mb-8">
            Our data security services help protect your sensitive information throughout its lifecycle with advanced
            controls and encryption solutions.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild className="bg-white text-green-900 hover:bg-gray-100">
              <Link href="/contact">Get a Free Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
              <Link href="#features">Explore Features</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="mb-16 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Data Classification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Identify and classify sensitive data to apply appropriate security controls.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Encryption Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Protect data at rest and in transit with advanced encryption technologies.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Data Loss Prevention</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Prevent unauthorized access to or exfiltration of sensitive data from your systems.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Database Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Protect databases from unauthorized access, vulnerabilities, and other security threats.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Access Control</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Implement strict access controls to ensure only authorized users can access sensitive data.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Data Backup & Recovery</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Ensure your data is properly backed up and can be recovered in case of data loss or ransomware attacks.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Secure Your Sensitive Data</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Contact our team of data security experts today to discuss your data protection needs and get started with our
          services.
        </p>
        <Button asChild size="lg" className="bg-white text-green-900 hover:bg-gray-100">
          <Link href="/contact">Contact Us Now</Link>
        </Button>
      </div>
    </div>
  )
}
