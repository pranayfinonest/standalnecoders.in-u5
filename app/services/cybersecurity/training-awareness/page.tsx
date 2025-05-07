import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Cybersecurity Training & Awareness | StandaloneCoders",
  description: "Effective security education programs to build a security-conscious culture",
  keywords: "cybersecurity training, security awareness, phishing simulations, employee training, security culture",
}

export default function TrainingAwarenessPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-700 to-orange-900 rounded-2xl p-8 md:p-12 mb-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/startup-team.png"
            alt="Cybersecurity Training"
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Cybersecurity Training & Awareness</h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-6">Build a security-conscious workforce</h2>
          <p className="text-lg mb-8">
            Our cybersecurity training and awareness programs help organizations build a security-conscious culture,
            reducing the risk of human-related security incidents.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild className="bg-white text-orange-900 hover:bg-gray-100">
              <Link href="/contact">Get a Free Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
              <Link href="#programs">Explore Programs</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div id="programs" className="mb-16 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Training Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Security Awareness Training</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive security awareness training for all employees to understand security risks and best
                practices.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Phishing Simulations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Realistic phishing simulations to test employee awareness and improve recognition of phishing attempts.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Role-Based Training</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Specialized training for specific roles such as developers, IT staff, executives, and data handlers.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Security Culture Development</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Programs designed to foster a security-conscious culture throughout your organization.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Compliance Training</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Training focused on regulatory compliance requirements such as GDPR, HIPAA, and PCI DSS.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Executive Briefings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Security briefings for executives on current threats, trends, and strategic security considerations.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Benefits of Security Training</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex">
            <div className="mr-4 mt-1">
              <CheckCircle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Reduced Security Incidents</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Well-trained employees are less likely to fall victim to social engineering and other attacks.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 mt-1">
              <CheckCircle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Improved Response Time</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Trained staff can identify and report security incidents more quickly, reducing impact.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 mt-1">
              <CheckCircle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Enhanced Security Culture</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Build a culture where security is everyone's responsibility, not just IT's.
              </p>
            </div>
          </div>

          <div className="flex">
            <div className="mr-4 mt-1">
              <CheckCircle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Compliance Requirements</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Meet security awareness training requirements mandated by various regulations and standards.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-700 to-orange-900 rounded-2xl p-8 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Build a Security-Conscious Workforce</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Contact our training experts today to discuss your security awareness needs and get started with our programs.
        </p>
        <Button asChild size="lg" className="bg-white text-orange-900 hover:bg-gray-100">
          <Link href="/contact">Contact Us Now</Link>
        </Button>
      </div>
    </div>
  )
}
