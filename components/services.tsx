"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight, Code, Smartphone, Globe, Palette, Search, ShieldCheck, BrainCircuit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Services() {
  const [activeTab, setActiveTab] = useState("all")

  const services = {
    "website-development": {
      title: "Website Development",
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      description: "Custom websites built with cutting-edge technologies",
      items: [
        {
          title: "Custom Website Development",
          description: "Tailored websites designed to meet your specific business needs and goals",
          link: "/services/website-development#custom",
        },
        {
          title: "E-commerce Solutions",
          description: "Powerful online stores with secure payment gateways and inventory management",
          link: "/services/website-development#ecommerce",
        },
        {
          title: "CMS Development",
          description: "Easy-to-manage content management systems for seamless updates",
          link: "/services/website-development#cms",
        },
        {
          title: "Progressive Web Apps",
          description: "Fast, engaging mobile-first web experiences that work offline",
          link: "/services/website-development#pwa",
        },
      ],
    },
    "ai-technology": {
      title: "AI Technology",
      icon: <BrainCircuit className="h-6 w-6 text-purple-600" />,
      description: "Intelligent solutions powered by artificial intelligence",
      items: [
        {
          title: "AI Chatbots",
          description: "Intelligent conversational agents to enhance customer service",
          link: "/services/ai-technology#chatbots",
        },
        {
          title: "Machine Learning Integration",
          description: "Data-driven insights and predictions for business optimization",
          link: "/services/ai-technology#machine-learning",
        },
        {
          title: "Natural Language Processing",
          description: "Text analysis and understanding for automated content management",
          link: "/services/ai-technology#nlp",
        },
        {
          title: "Computer Vision Solutions",
          description: "Image recognition and processing for advanced applications",
          link: "/services/ai-technology#computer-vision",
        },
      ],
    },
    "app-development": {
      title: "App Development",
      icon: <Smartphone className="h-6 w-6 text-green-600" />,
      description: "Native and cross-platform mobile applications",
      items: [
        {
          title: "iOS App Development",
          description: "Native applications for iPhone and iPad devices",
          link: "/services/app-development#ios",
        },
        {
          title: "Android App Development",
          description: "Custom applications for the Android ecosystem",
          link: "/services/app-development#android",
        },
        {
          title: "Cross-Platform Development",
          description: "Efficient apps that work seamlessly across multiple platforms",
          link: "/services/app-development#cross-platform",
        },
        {
          title: "App Maintenance & Support",
          description: "Ongoing updates and technical support for your applications",
          link: "/services/app-development#maintenance",
        },
      ],
    },
    "digital-marketing": {
      title: "Digital Marketing",
      icon: <Search className="h-6 w-6 text-yellow-600" />,
      description: "Strategies to grow your online presence and reach",
      items: [
        {
          title: "Search Engine Optimization",
          description: "Improve your visibility in search engine results",
          link: "/services/digital-marketing#seo",
        },
        {
          title: "Social Media Marketing",
          description: "Engage with your audience across popular social platforms",
          link: "/services/digital-marketing#social-media",
        },
        {
          title: "Content Marketing",
          description: "Create valuable content that attracts and engages your target audience",
          link: "/services/digital-marketing#content",
        },
        {
          title: "Pay-Per-Click Advertising",
          description: "Targeted ad campaigns to drive immediate traffic and conversions",
          link: "/services/digital-marketing#ppc",
        },
      ],
    },
    cybersecurity: {
      title: "Cybersecurity",
      icon: <ShieldCheck className="h-6 w-6 text-red-600" />,
      description: "Protect your digital assets and customer data",
      items: [
        {
          title: "Security Audits & Assessments",
          description: "Comprehensive evaluation of your security posture and vulnerabilities",
          link: "/services/cybersecurity#audits",
        },
        {
          title: "Penetration Testing",
          description: "Simulated cyber attacks to identify security weaknesses",
          link: "/services/cybersecurity#pentesting",
        },
        {
          title: "Secure Development Practices",
          description: "Building security into your applications from the ground up",
          link: "/services/cybersecurity#secure-dev",
        },
        {
          title: "Incident Response Planning",
          description: "Preparation and strategies for handling security breaches",
          link: "/services/cybersecurity#incident-response",
        },
      ],
    },
    "creative-services": {
      title: "Creative Services",
      icon: <Palette className="h-6 w-6 text-pink-600" />,
      description: "Design and creative solutions for your brand",
      items: [
        {
          title: "UI/UX Design",
          description: "User-centered design that enhances user experience and satisfaction",
          link: "/services/creative-services#ui-ux",
        },
        {
          title: "Brand Identity Design",
          description: "Distinctive visual elements that represent your brand's personality",
          link: "/services/creative-services#brand-identity",
        },
        {
          title: "Graphic Design",
          description: "Compelling visuals for both print and digital media",
          link: "/services/creative-services#graphic-design",
        },
        {
          title: "Motion Graphics & Animation",
          description: "Engaging animated content to capture audience attention",
          link: "/services/creative-services#animation",
        },
      ],
    },
    "custom-software": {
      title: "Custom Software",
      icon: <Code className="h-6 w-6 text-indigo-600" />,
      description: "Tailored software solutions for your business needs",
      items: [
        {
          title: "Enterprise Software Development",
          description: "Scalable applications designed for large-scale business operations",
          link: "/services/custom-software#enterprise",
        },
        {
          title: "SaaS Product Development",
          description: "Cloud-based software solutions with subscription models",
          link: "/services/custom-software#saas",
        },
        {
          title: "API Development & Integration",
          description: "Connect your systems and enable seamless data flow between applications",
          link: "/services/custom-software#api",
        },
        {
          title: "Legacy System Modernization",
          description: "Update and transform outdated systems for improved performance",
          link: "/services/custom-software#legacy",
        },
      ],
    },
  }

  const categories = Object.keys(services)

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
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            We offer a comprehensive range of digital solutions to help your business thrive in the digital landscape.
          </motion.p>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="all">All Services</TabsTrigger>
              <TabsTrigger value="development">Development</TabsTrigger>
              <TabsTrigger value="design">Design & Marketing</TabsTrigger>
              <TabsTrigger value="technology">Technology</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {categories.map((category) => (
                <motion.div key={category} variants={fadeIn}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3 mr-4">
                          {services[category].icon}
                        </div>
                        <h3 className="text-xl font-bold">{services[category].title}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">{services[category].description}</p>
                      <ul className="space-y-3 mb-6">
                        {services[category].items.slice(0, 2).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{item.title}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/services/${category}`}>
                          Learn More <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="development">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {["website-development", "app-development", "custom-software"].map((category) => (
                <motion.div key={category} variants={fadeIn}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3 mr-4">
                          {services[category].icon}
                        </div>
                        <h3 className="text-xl font-bold">{services[category].title}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">{services[category].description}</p>
                      <ul className="space-y-3 mb-6">
                        {services[category].items.slice(0, 2).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{item.title}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/services/${category}`}>
                          Learn More <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="design">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {["creative-services", "digital-marketing"].map((category) => (
                <motion.div key={category} variants={fadeIn}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3 mr-4">
                          {services[category].icon}
                        </div>
                        <h3 className="text-xl font-bold">{services[category].title}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">{services[category].description}</p>
                      <ul className="space-y-3 mb-6">
                        {services[category].items.slice(0, 2).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{item.title}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/services/${category}`}>
                          Learn More <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="technology">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {["ai-technology", "cybersecurity"].map((category) => (
                <motion.div key={category} variants={fadeIn}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3 mr-4">
                          {services[category].icon}
                        </div>
                        <h3 className="text-xl font-bold">{services[category].title}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">{services[category].description}</p>
                      <ul className="space-y-3 mb-6">
                        {services[category].items.slice(0, 2).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <ChevronRight className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{item.title}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/services/${category}`}>
                          Learn More <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Need a custom solution?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              We specialize in creating tailored digital solutions that address your unique business challenges. Let's
              discuss how we can help you achieve your goals.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
