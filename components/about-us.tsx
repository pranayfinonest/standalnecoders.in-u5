"use client"

import { useState } from "react"
import { Rocket, Zap, Users, Code, ArrowRight, Sparkles, Shield, BarChart, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ProductDemo from "./product-demo"

export default function AboutUs() {
  const [activeValue, setActiveValue] = useState("innovation")

  const values = [
    {
      id: "innovation",
      icon: <Sparkles className="w-5 h-5" />,
      name: "Innovation",
      description:
        "We thrive on creative problem-solving and pushing the boundaries of what's possible with technology.",
    },
    {
      id: "agility",
      icon: <Zap className="w-5 h-5" />,
      name: "Agility",
      description:
        "We move fast, adapt quickly, and embrace change to deliver solutions that keep our clients ahead of the curve.",
    },
    {
      id: "collaboration",
      icon: <Users className="w-5 h-5" />,
      name: "Collaboration",
      description:
        "We believe the best solutions come from working closely with our clients and combining diverse perspectives.",
    },
    {
      id: "excellence",
      icon: <Code className="w-5 h-5" />,
      name: "Excellence",
      description: "We're committed to quality in everything we do, from clean code to exceptional user experiences.",
    },
  ]

  const milestones = [
    {
      year: "2022",
      title: "The Beginning",
      description:
        "StandaloneCoders was founded with a vision to make cutting-edge technology accessible to businesses of all sizes.",
    },
    {
      year: "2022",
      title: "First Clients",
      description:
        "Secured our first clients and delivered successful projects in cybersecurity and digital marketing.",
    },
    {
      year: "2023",
      title: "Team Expansion",
      description:
        "Grew our team of talented developers, designers, and security experts to enhance our service offerings.",
    },
    {
      year: "2024",
      title: "New Horizons",
      description: "Expanded our services to include AI solutions and advanced technology implementations.",
    },
  ]

  const clientBenefits = [
    {
      icon: <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "Trusted Partnership",
      description: "We build long-term relationships based on trust, transparency, and consistent delivery of value.",
    },
    {
      icon: <BarChart className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "Measurable Results",
      description: "Our solutions are designed to deliver tangible business outcomes with clear ROI for our clients.",
    },
    {
      icon: <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "Quality Assurance",
      description: "We maintain rigorous quality standards throughout our development and delivery processes.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                Our Story
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                We're a <span className="text-blue-600 dark:text-blue-400">tech startup</span> on a mission
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                StandaloneCoders is a young, dynamic team of tech enthusiasts building innovative solutions for the
                digital age. We combine technical expertise with creative thinking to solve complex problems.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="#team"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg inline-flex items-center transition-all"
                >
                  Meet our team
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <Link
                  href="#contact"
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium rounded-lg transition-all"
                >
                  Get in touch
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative h-64 md:h-80 w-full">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200 dark:bg-blue-900/50 rounded-lg z-0"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-100 dark:bg-blue-800/30 rounded-lg z-0"></div>
                <div className="absolute inset-0 z-10">
                  <Image
                    src="/startup-team.png"
                    alt="StandaloneCoders Team"
                    fill
                    className="object-cover rounded-lg shadow-lg"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Focus Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Client-Focused Approach</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                We prioritize our clients' success through dedicated service and exceptional solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {clientBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all border-t-4 border-blue-600"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Demo Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mb-4">
                <Code className="w-6 h-6" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Try Our Product</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Experience our cybersecurity scanning technology with this interactive demo.
              </p>
            </div>

            <ProductDemo />

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Want to see how our technology can protect your business?
              </p>
              <Link
                href="#contact"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg inline-flex items-center transition-all"
              >
                Get a Free Security Assessment
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 mb-4">
              <Rocket className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              To empower businesses with innovative technology solutions that are accessible, effective, and
              future-ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Cybersecurity</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We build robust security solutions that protect your digital assets from evolving threats.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">AI Solutions</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We leverage artificial intelligence to create smart, adaptive solutions that grow with your business.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Digital Marketing</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We create data-driven marketing strategies that connect you with your audience and drive growth.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The principles that guide our work and define our culture.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {values.map((value) => (
              <button
                key={value.id}
                onClick={() => setActiveValue(value.id)}
                className={`p-4 rounded-lg text-center transition-all ${
                  activeValue === value.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex justify-center mb-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activeValue === value.id ? "bg-blue-500" : "bg-white dark:bg-gray-700"
                    }`}
                  >
                    {value.icon}
                  </div>
                </div>
                <div className="font-medium">{value.name}</div>
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
            {values.map(
              (value) =>
                activeValue === value.id && (
                  <div key={value.id} className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-4 flex-shrink-0">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{value.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                    </div>
                  </div>
                ),
            )}
          </div>
        </div>
      </div>

      {/* Journey Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Startup Journey</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                From idea to innovation - the story of our growth.
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-900/50"></div>

              {/* Timeline items */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                  >
                    <div className="md:w-1/2 mb-8 md:mb-0"></div>
                    <div className="absolute left-0 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-500 border-4 border-white dark:border-gray-800 z-10"></div>
                    </div>
                    <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                        <div className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Section */}
      <div id="team" className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Leadership</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our leadership team brings together expertise in technology, business strategy, and industry knowledge to
              drive innovation and deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
              <div className="relative w-full bg-gray-50 dark:bg-gray-900" style={{ height: "400px" }}>
                <img
                  src="/yogendra-singh.png"
                  alt="Yogendra Singh - Founder & CEO"
                  className="h-full w-auto mx-auto object-contain"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Yogendra Singh</h3>
                <p className="text-blue-600 dark:text-blue-400 text-lg mb-4">Founder & CEO</p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Yogendra is a visionary tech entrepreneur with extensive experience in software development and
                  business strategy. His leadership has been instrumental in establishing StandaloneCoders as a trusted
                  technology partner for businesses across industries.
                </p>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "Our mission is to make cutting-edge technology accessible to businesses of all sizes, helping them
                    thrive in the digital age."
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
              <div className="relative w-full bg-gray-50 dark:bg-gray-900" style={{ height: "400px" }}>
                {/* Direct embedded image using img tag with src attribute pointing to the blob URL */}
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250428-WA0016.jpg-gahs0DjvTQDhrpXHGwzvCi30D6DJBm.jpeg"
                  alt="Neeraj - Co-founder & CTO"
                  className="h-full w-auto mx-auto object-contain"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">Neeraj</h3>
                <p className="text-blue-600 dark:text-blue-400 text-lg mb-4">Co-Founder & CTO</p>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Neeraj is the technical mastermind behind our solutions with deep expertise in cybersecurity, software
                  architecture, and emerging technologies. His technical leadership ensures our clients receive robust,
                  scalable, and future-proof solutions.
                </p>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "We build technology solutions that not only solve today's challenges but are designed to adapt and
                    evolve with our clients' needs."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 dark:bg-blue-700 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to innovate with us?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Let's discuss how our expertise can help your business grow with technology.
            </p>
            <Link
              href="#contact"
              className="px-8 py-4 bg-white text-blue-600 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center"
            >
              Schedule a Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
