"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "CEO, TechInnovate",
    image: "/team-member-1.png",
    content:
      "StandaloneCoders transformed our digital presence completely. Their cybersecurity expertise helped us secure our systems while their web development team created an amazing website that perfectly represents our brand.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Marketing Director, GrowthFirst",
    image: "/team-member-2.png",
    content:
      "Working with Yogendra and his team was a game-changer for our marketing strategy. Their AI-powered solutions helped us understand our customers better and target them more effectively.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit Kumar",
    role: "Founder, StartupBoost",
    image: "/team-member-3.png",
    content:
      "As a startup, we needed a partner who could handle all our tech needs while we focused on growth. StandaloneCoders delivered beyond our expectations with their comprehensive services.",
    rating: 4,
  },
  {
    id: 4,
    name: "Sneha Gupta",
    role: "CTO, InnovateTech",
    image: "/yogendra-singh.png",
    content:
      "The cybersecurity audit conducted by StandaloneCoders revealed critical vulnerabilities we weren't aware of. Their prompt remediation saved us from potential data breaches.",
    rating: 5,
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleTestimonials, setVisibleTestimonials] = useState([])
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // Set initial width
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    // Determine how many testimonials to show based on screen width
    let visibleCount = 1
    if (windowWidth >= 1024) {
      visibleCount = 3
    } else if (windowWidth >= 640) {
      visibleCount = 2
    }

    // Update visible testimonials
    const visible = []
    for (let i = 0; i < visibleCount; i++) {
      const index = (activeIndex + i) % testimonials.length
      visible.push(testimonials[index])
    }
    setVisibleTestimonials(visible)
  }, [activeIndex, windowWidth])

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

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
    <section className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about working with StandaloneCoders.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="relative"
        >
          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div key={testimonial.id} variants={fadeIn} className="w-full">
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold">{testimonial.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                        </div>
                      </div>
                      <Quote className="h-8 w-8 text-blue-200 dark:text-blue-900" />
                    </div>
                    <div className="mb-4">
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{testimonial.content}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Button variant="outline" size="icon" onClick={handlePrev} aria-label="Previous testimonial">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNext} aria-label="Next testimonial">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
