import { CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Cybersecurity Assessments | StandaloneCoders",
  description:
    "Comprehensive cybersecurity assessment services to identify vulnerabilities and strengthen your security posture",
  keywords:
    "cybersecurity assessment, vulnerability assessment, security audit, risk assessment, security gap analysis",
}

export default function AssessmentsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-8 md:p-12 mb-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/interconnected-world.png"
            alt="Cybersecurity Assessments"
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Cybersecurity Assessments</h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-6">Identify vulnerabilities before attackers do</h2>
          <p className="text-lg mb-8">
            Our comprehensive assessment services help identify security gaps, vulnerabilities, and risks in your IT
            infrastructure, applications, and processes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild className="bg-white text-blue-900 hover:bg-gray-100">
              <Link href="/contact">Get a Free Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
              <Link href="#pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Key Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex">
            <div className="mr-4 mt-1">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Proactive Risk Identification</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Identify security vulnerabilities and weaknesses before they can be exploited by attackers.
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="mr-4 mt-1">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Compliance Verification</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Ensure your systems and processes comply with relevant regulatory requirements and security standards.
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="mr-4 mt-1">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Prioritized Remediation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive actionable recommendations prioritized by risk level to address the most critical issues first.
              </p>
            </div>
          </div>
          <div className="flex">
            <div className="mr-4 mt-1">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Improved Security Posture</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Strengthen your overall security posture with insights from our expert assessments.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Vulnerability Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Thorough scanning and analysis of systems and applications to identify security vulnerabilities.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Penetration Testing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Simulated attacks to test defenses and identify exploitable vulnerabilities in your systems.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Security Architecture Review</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive analysis of your security architecture to identify design flaws and improvement
                opportunities.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Code Security Review</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                In-depth examination of application code to identify security flaws and weaknesses.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Cloud Security Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Specialized assessment of cloud environments to ensure proper security configurations and controls.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Structured analysis of security risks facing your organization, prioritized by impact and likelihood.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="mb-16 scroll-mt-24">
        <h2 className="text-3xl font-bold mb-8 text-center">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border border-gray-200 dark:border-gray-800 relative">
            <CardHeader>
              <CardTitle>Basic Assessment</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">₹75,000</span>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Essential vulnerability assessment for small businesses
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                  <span>External vulnerability scan</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                  <span>Basic configuration review</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                  <span>Summary report with findings</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                  <span>Remediation recommendations</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                  <span>30-day post-assessment support</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button asChild className="w-full">
                  <Link href="/contact">Get Started</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-blue-500 dark:border-blue-400 relative">
            <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
              Recommended
            </div>
            <CardHeader>
              <CardTitle>Comprehensive Assessment</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">₹150,000</span>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Thorough assessment for medium-sized organizations
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                  <span>External & internal vulnerability scanning</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                  <span>Configuration & architecture review</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                  <span>Limited penetration testing</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                  <span>Detailed reporting with risk ratings</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                  <span>60-day post-assessment support</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                  <span>Remediation planning assistance</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button asChild className="w-full">
                  <Link href="/contact">Get Started</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 dark:border-gray-800 relative">
            <CardHeader>
              <CardTitle>Enterprise Assessment</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">₹300,000+</span>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Advanced assessment for large or complex environments
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                  <span>Comprehensive vulnerability assessment</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                  <span>Full-scope penetration testing</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                  <span>Cloud security assessment</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                  <span>Application security review</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                  <span>Executive & technical reporting</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                  <span>90-day post-assessment support</span>
                </li>
                <li className="flex">
                  <CheckCircle className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                  <span>Remediation verification testing</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button asChild className="w-full">
                  <Link href="/contact">Get Started</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Business?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Contact our team of cybersecurity experts today to discuss your security needs and get started with our
          cybersecurity assessment services.
        </p>
        <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
          <Link href="/contact">Contact Us Now</Link>
        </Button>
      </div>
    </div>
  )
}
