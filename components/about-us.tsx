"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Trophy, Clock, ChevronRight } from "lucide-react"

export default function AboutUs() {
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
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="relative h-[500px] rounded-xl overflow-hidden shadow-xl"
          >
            <Image
              src="/yogendra-singh.png"
              alt="Yogendra Singh - Founder"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About StandaloneCoders</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              StandaloneCoders is a premier web development and digital solutions company based in India. We specialize
              in creating innovative, scalable, and user-friendly digital experiences that help businesses thrive in the
              digital landscape.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Founded in 2018, we've grown from a small team of passionate developers to a full-service digital agency
              serving clients across various industries. Our mission is to empower businesses with cutting-edge
              technology solutions that drive growth and success.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Expert Developers</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Timely Delivery</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Quality Assurance</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Ongoing Support</span>
              </div>
            </div>
            <Button asChild size="lg">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          <motion.div variants={fadeIn}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Team</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Our diverse team of experts brings together a wealth of knowledge and experience in web development,
                  design, and digital marketing. We're passionate about technology and committed to delivering
                  exceptional results.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/about#team">
                    Meet Our Team <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="rounded-full bg-green-100 dark:bg-green-900/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Achievements</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Over the years, we've successfully completed hundreds of projects and helped numerous businesses
                  establish a strong online presence. Our work has been recognized with industry awards and, most
                  importantly, client satisfaction.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/about#achievements">
                    View Achievements <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="rounded-full bg-purple-100 dark:bg-purple-900/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Our Process</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We follow a structured and transparent development process that ensures clear communication, timely
                  delivery, and high-quality results. From initial consultation to post-launch support, we're with you
                  every step of the way.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/about#process">
                    Explore Our Process <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <div className="text-center mb-12">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Why Choose StandaloneCoders?
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            We combine technical expertise with creative thinking to deliver solutions that not only meet but exceed
            your expectations.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {[
            {
              title: "Technical Excellence",
              description: "Our team stays at the forefront of technology trends to deliver cutting-edge solutions.",
            },
            {
              title: "Client-Focused Approach",
              description:
                "We prioritize your needs and goals, ensuring our solutions align with your business objectives.",
            },
            {
              title: "Transparent Communication",
              description: "We maintain clear and open communication throughout the project lifecycle.",
            },
            {
              title: "Long-term Partnership",
              description:
                "We build lasting relationships with our clients, providing ongoing support and maintenance.",
            },
          ].map((item, index) => (
            <motion.div key={index} variants={fadeIn}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900/20 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <span className="text-xl font-bold text-blue-600">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
