import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CheckCircle, Code, Database, Server, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Custom Software Development | StandaloneCoders",
  description:
    "Enterprise-grade custom software solutions tailored to your business needs. From CRM and ERP systems to bespoke applications, we deliver scalable, secure software.",
  keywords:
    "custom software development, enterprise software, bespoke applications, CRM development, ERP systems, software solutions, StandaloneCoders",
}

export default function CustomSoftwarePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h1 className="text-4xl font-bold mb-6">Custom Software Development</h1>
          <p className="text-xl text-gray-700 mb-8">
            Tailored software solutions designed to solve your unique business challenges and drive growth.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <p>Enterprise-grade applications built for scalability and performance</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <p>Secure, reliable, and maintainable code architecture</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <p>Seamless integration with your existing systems and workflows</p>
            </div>
            <div className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <p>Ongoing support and maintenance to ensure long-term success</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">Get a Free Consultation</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/portfolio">View Our Portfolio</Link>
            </Button>
          </div>
        </div>
        <div className="bg-gray-100 rounded-xl p-8 h-[400px] flex items-center justify-center">
          <img
            src="/intricate-logic-flow.png"
            alt="Custom Software Development"
            className="max-w-full max-h-full rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Services Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Custom Software Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Enterprise Applications",
              description: "Scalable, secure, and robust applications designed for large-scale enterprise operations.",
              icon: <Server className="w-12 h-12 text-blue-600" />,
            },
            {
              title: "CRM & ERP Systems",
              description: "Custom customer relationship management and enterprise resource planning solutions.",
              icon: <Database className="w-12 h-12 text-blue-600" />,
            },
            {
              title: "Workflow Automation",
              description: "Streamline your business processes with intelligent automation solutions.",
              icon: <Zap className="w-12 h-12 text-blue-600" />,
            },
            {
              title: "Legacy System Modernization",
              description: "Transform outdated systems into modern, efficient applications.",
              icon: <Code className="w-12 h-12 text-blue-600" />,
            },
            {
              title: "Secure Financial Software",
              description: "Develop secure and compliant financial applications and payment systems.",
              icon: <Shield className="w-12 h-12 text-blue-600" />,
            },
            {
              title: "Custom Integrations",
              description: "Seamlessly connect your software with third-party services and APIs.",
              icon: <ArrowRight className="w-12 h-12 text-blue-600" />,
            },
          ].map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-blue-50 p-4 rounded-full inline-block mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Development Process</h2>
        <div className="relative">
          {/* Process Timeline */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2"></div>
          <div className="space-y-12">
            {[
              {
                title: "Discovery & Planning",
                description:
                  "We start by understanding your business needs, challenges, and goals to create a comprehensive project plan.",
                step: "01",
              },
              {
                title: "Design & Architecture",
                description:
                  "Our team designs the software architecture and user experience to ensure optimal performance and usability.",
                step: "02",
              },
              {
                title: "Development & Testing",
                description:
                  "We follow agile development practices with continuous testing to ensure high-quality code and functionality.",
                step: "03",
              },
              {
                title: "Deployment & Integration",
                description:
                  "We deploy your software and ensure seamless integration with your existing systems and workflows.",
                step: "04",
              },
              {
                title: "Support & Maintenance",
                description:
                  "Our team provides ongoing support and maintenance to ensure your software continues to perform optimally.",
                step: "05",
              },
            ].map((process, index) => (
              <div key={index} className="relative flex flex-col md:flex-row items-center">
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:order-last"}`}>
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-xl font-bold mb-3">{process.title}</h3>
                    <p className="text-gray-700">{process.description}</p>
                  </div>
                </div>
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                  <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
                    {process.step}
                  </div>
                </div>
                <div className="md:hidden bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold mb-4">
                  {process.step}
                </div>
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12 md:text-right"}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technologies Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Technologies We Use</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
            { name: ".NET", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" },
            { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
            { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
            {
              name: "AWS",
              logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
            },
            { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
            { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
            {
              name: "Kubernetes",
              logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
            },
            {
              name: "MongoDB",
              logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
            },
            {
              name: "PostgreSQL",
              logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
            },
            { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
          ].map((tech, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center"
            >
              <img src={tech.logo || "/placeholder.svg"} alt={tech.name} className="h-16 w-16 mb-2" />
              <p className="font-medium text-center">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-50 rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Build Your Custom Software Solution?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Let's discuss how our custom software development services can help your business grow and succeed.
        </p>
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Link href="/contact">Schedule a Consultation</Link>
        </Button>
      </div>
    </div>
  )
}
