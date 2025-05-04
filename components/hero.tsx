"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const imageAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2 } },
  }

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800" />

      {/* Background decorative elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full filter blur-3xl opacity-70" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-200 dark:bg-blue-800/20 rounded-full filter blur-3xl opacity-70" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
              Transforming Ideas into <span className="text-blue-600 dark:text-blue-400">Digital Reality</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
              We provide comprehensive technology solutions including cybersecurity, AI implementation, digital
              marketing, and creative services to help your business thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="text-base">
                <Link href="/services" className="flex items-center">
                  Explore Services <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={imageAnimation} className="relative mt-8 lg:mt-0">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="aspect-[4/3] w-full relative">
                <Image
                  src="/digital-transformation-blueprint.png"
                  alt="Digital Transformation Blueprint"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600 dark:bg-blue-500 rounded-full filter blur-3xl opacity-20 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
