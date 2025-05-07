import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "ISO Certification & Compliance | StandaloneCoders",
  description: "Expert guidance for achieving and maintaining ISO security certifications",
  keywords: "ISO 27001, ISO certification, compliance, security standards, information security management",
}

export default function ISOCertificationCompliancePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-700 to-yellow-900 rounded-2xl p-8 md:p-12 mb-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/confident-leader.png"
            alt="ISO Certification"
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4">ISO Certification & Compliance</h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-6">Achieve industry-recognized security standards</h2>
          <p className="text-lg mb-8">
            Our ISO certification and compliance services provide expert guidance for achieving and maintaining ISO
            security certifications, demonstrating your commitment to security.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild className="bg-white text-yellow-900 hover:bg-gray-100">
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
        <h2 className="text-3xl font-bold mb-8 text-center">Our ISO Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>ISO 27001 Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Expert guidance on implementing an Information Security Management System (ISMS) compliant with ISO
                27001.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Gap Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Thorough assessment of your current security posture against ISO requirements to identify gaps.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Certification Preparation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive support to prepare your organization for ISO certification audits.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Compliance Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Ongoing support to maintain compliance with ISO standards and prepare for surveillance audits.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Staff Training</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Training programs to ensure your staff understands ISO requirements and their responsibilities.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Documentation Development</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Creation of required policies, procedures, and other documentation for ISO compliance.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Benefits of ISO Certification</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex">
            <div className="mr-4 mt-1">
              <CheckCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Enhanced Security Posture</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Implementing ISO standards significantly improves your organization's overall security posture.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 mt-1">
              <CheckCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Competitive Advantage</h3>
              <p className="text-gray-600 dark:text-gray-400">
                ISO certification demonstrates your commitment to security, giving you an edge over competitors.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 mt-1">
              <CheckCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Customer Trust</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Build greater trust with customers and partners who value security-conscious organizations.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 mt-1">
              <CheckCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Regulatory Compliance</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Helps meet many regulatory and contractual requirements related to information security.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-yellow-700 to-yellow-900 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Start Your ISO Certification Journey</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Contact our compliance experts today to discuss your ISO certification needs and get started with our
          services.
        </p>
        <Button asChild size="lg" className="bg-white text-yellow-900 hover:bg-gray-100">
          <Link href="/contact">Contact Us Now</Link>
        </Button>
      </div>
    </div>
  )
}
