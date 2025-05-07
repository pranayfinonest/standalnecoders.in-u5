"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Shield,
  Radar,
  Database,
  Award,
  Eye,
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  FileWarning,
  FileCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define the service types for consistent structure
type ServiceItem = {
  id: string
  icon: React.ReactNode
  color: string
  title: string
  description: string
  link: string
  features: string[]
}

export default function CybersecurityServicesPage() {
  const [activeTab, setActiveTab] = useState("all")

  // Define all cybersecurity services
  const services: ServiceItem[] = [
    {
      id: "assessments",
      icon: <Shield className="h-6 w-6" />,
      color: "blue",
      title: "Cybersecurity Assessments",
      description: "Comprehensive evaluation of your security posture to identify vulnerabilities and risks.",
      link: "/services/cybersecurity/assessments",
      features: ["Vulnerability Assessment", "Penetration Testing", "Security Architecture Review", "Risk Assessment"],
    },
    {
      id: "network-threat",
      icon: <Radar className="h-6 w-6" />,
      color: "indigo",
      title: "Network & Cyber Threat Intelligence",
      description: "Advanced monitoring and intelligence to protect against emerging threats.",
      link: "/services/cybersecurity/network-cyber-threat-intelligence",
      features: ["Threat Intelligence", "Network Monitoring", "Advanced Threat Detection", "Security Operations"],
    },
    {
      id: "data-security",
      icon: <Database className="h-6 w-6" />,
      color: "green",
      title: "Data Security",
      description: "Protecting your sensitive data throughout its lifecycle with advanced controls.",
      link: "/services/cybersecurity/data-security",
      features: ["Data Classification", "Encryption Solutions", "Data Loss Prevention", "Database Security"],
    },
    {
      id: "iso-compliance",
      icon: <Award className="h-6 w-6" />,
      color: "yellow",
      title: "ISO Certification & Compliance",
      description: "Expert guidance for achieving and maintaining ISO security certifications.",
      link: "/services/cybersecurity/iso-certification-compliance",
      features: ["ISO 27001 Implementation", "Gap Assessment", "Certification Preparation", "Compliance Management"],
    },
    {
      id: "privacy",
      icon: <Eye className="h-6 w-6" />,
      color: "purple",
      title: "Privacy & Cybersecurity",
      description: "Comprehensive privacy protection and regulatory compliance solutions.",
      link: "/services/cybersecurity/privacy-cybersecurity",
      features: ["Privacy Program Development", "GDPR Compliance", "Data Protection", "Privacy Impact Assessments"],
    },
    {
      id: "training",
      icon: <BookOpen className="h-6 w-6" />,
      color: "orange",
      title: "Training & Awareness",
      description: "Effective security education programs to build a security-conscious culture.",
      link: "/services/cybersecurity/training-awareness",
      features: [
        "Security Awareness Training",
        "Phishing Simulations",
        "Role-Based Training",
        "Security Culture Development",
      ],
    },
    {
      id: "managed-services",
      icon: <ShieldCheck className="h-6 w-6" />,
      color: "blue",
      title: "Managed Security Services",
      description: "24/7 security monitoring and management to protect your organization.",
      link: "/services/cybersecurity/managed-security-services",
      features: ["Security Monitoring", "Incident Response", "Vulnerability Management", "Security Operations"],
    },
    {
      id: "specialized",
      icon: <AlertTriangle className="h-6 w-6" />,
      color: "red",
      title: "Specialized Security Solutions & Incident Response",
      description: "Advanced security expertise for complex challenges and security incidents.",
      link: "/services/cybersecurity/specialized-security-solutions-incident-response",
      features: ["Incident Response", "Digital Forensics", "Advanced Threat Detection", "Custom Security Solutions"],
    },
  ]

  // Filter services based on active tab
  const filteredServices = activeTab === "all" ? services : services.filter((service) => service.id === activeTab)

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-4 sm:p-8 md:p-12 mb-8 sm:mb-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/interconnected-world.png"
            alt="Cybersecurity Network"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full bg-white/20 text-white text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Security Services
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Comprehensive Cybersecurity Services
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6">
            Protecting your digital assets in an evolving threat landscape
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8">
            Our cybersecurity services provide robust protection for your organization's critical assets, helping you
            identify vulnerabilities, mitigate risks, and respond effectively to security incidents.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button size="default" asChild className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100">
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
            <Button
              size="default"
              variant="outline"
              asChild
              className="w-full sm:w-auto border-white text-white hover:bg-white/10"
            >
              <Link href="#cybersecurity-services">Explore Services</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="cybersecurity-services" className="mb-12 sm:mb-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Cybersecurity Services</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover our range of specialized cybersecurity services designed to protect your organization from evolving
            threats
          </p>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-6 sm:mb-8">
            <TabsList className="flex overflow-x-auto pb-2 w-full max-w-full sm:max-w-3xl sm:justify-center mx-auto">
              <TabsTrigger value="all" className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm whitespace-nowrap">
                All Services
              </TabsTrigger>
              <TabsTrigger value="assessments" className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm whitespace-nowrap">
                Assessments
              </TabsTrigger>
              <TabsTrigger value="network-threat" className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm whitespace-nowrap">
                Threat Intelligence
              </TabsTrigger>
              <TabsTrigger value="data-security" className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm whitespace-nowrap">
                Data Security
              </TabsTrigger>
              <TabsTrigger value="managed-services" className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm whitespace-nowrap">
                Managed Services
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="flex justify-center md:hidden">
            <p className="text-xs text-gray-500 italic">Swipe tabs to see more →</p>
          </div>

          <TabsContent value={activeTab}>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredServices.map((service) => (
                <motion.div key={service.id} variants={fadeIn}>
                  <Card className="h-full hover:shadow-md transition-shadow duration-300 border border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <div className="flex items-center mb-2">
                        <div
                          className={`rounded-full p-2 mr-3 bg-${service.color}-100 dark:bg-${service.color}-900/30 text-${service.color}-600 dark:text-${service.color}-400`}
                        >
                          {service.icon}
                        </div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </div>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link href={service.link}>
                          Learn More <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Why Choose Us Section */}
      <div className="mb-12 sm:mb-20 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 sm:p-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Why Choose Our Cybersecurity Services</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our approach to cybersecurity combines technical expertise, industry experience, and personalized service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
            <CardHeader>
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2 w-12 h-12 flex items-center justify-center mb-3">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Expert Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Our team includes certified security professionals with extensive experience across various industries
                and security domains.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
            <CardHeader>
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2 w-12 h-12 flex items-center justify-center mb-3">
                <FileWarning className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Proven Methodology</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                We follow industry-standard frameworks and methodologies, customized to address your organization's
                specific security needs.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-0 shadow-sm">
            <CardHeader>
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2 w-12 h-12 flex items-center justify-center mb-3">
                <FileCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Comprehensive Approach</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Our services address the full spectrum of security needs, from assessment and implementation to training
                and incident response.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-4 sm:p-8 md:p-12 text-white text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
          Ready to Strengthen Your Security Posture?
        </h2>
        <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
          Get in touch with our cybersecurity experts today to discuss your security challenges and discover how we can
          help protect your organization.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <Button asChild size="default" className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100">
            <Link href="/contact">Schedule a Consultation</Link>
          </Button>
          <Button
            asChild
            size="default"
            variant="outline"
            className="w-full sm:w-auto border-white text-white hover:bg-white/10"
          >
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
