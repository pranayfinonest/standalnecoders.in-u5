"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Linkedin, Twitter, Github, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const teamMembers = [
  {
    id: 2,
    name: "Priya Sharma",
    role: "UI/UX Designer",
    image: "/team-member-1.png",
    bio: "Priya creates beautiful, intuitive interfaces that enhance user experience and drive engagement for our clients' digital products.",
    social: {
      linkedin: "https://www.linkedin.com/",
      twitter: "https://twitter.com/",
      github: "https://github.com/",
      email: "priya@example.com",
    },
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Cybersecurity Specialist",
    image: "/team-member-2.png",
    bio: "Rahul ensures our clients' digital assets are protected with cutting-edge security measures and best practices.",
    social: {
      linkedin: "https://www.linkedin.com/",
      twitter: "https://twitter.com/",
      github: "https://github.com/",
      email: "rahul@example.com",
    },
  },
  {
    id: 4,
    name: "Neha Gupta",
    role: "Digital Marketing Expert",
    image: "/team-member-3.png",
    bio: "Neha develops and implements effective digital marketing strategies that help our clients reach their target audience.",
    social: {
      linkedin: "https://www.linkedin.com/",
      twitter: "https://twitter.com/",
      github: "https://github.com/",
      email: "neha@example.com",
    },
  },
]

export default function Team() {
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
    <section id="team" className="py-16 sm:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our talented team of experts is passionate about delivering exceptional digital solutions that help your
            business succeed.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {teamMembers.map((member) => (
            <motion.div key={member.id} variants={fadeIn}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="aspect-[3/4] relative">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{member.bio}</p>
                  <div className="flex space-x-3">
                    <Link
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </Link>
                    <Link
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <Twitter className="h-5 w-5" />
                    </Link>
                    <Link
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <Github className="h-5 w-5" />
                    </Link>
                    <Link
                      href={`mailto:${member.social.email}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-5 w-5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
