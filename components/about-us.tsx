"use client"

import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"

// Create a client component that safely uses useSearchParams
function AboutUsClient() {
  const searchParams = useSearchParams()
  const highlight = searchParams.get("highlight")

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About StandaloneCoders</h1>

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="md:w-1/3">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/yogendra-singh.png"
                alt="Yogendra Singh"
                width={400}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-4">Yogendra Singh</h2>
            <p className="text-gray-600 mb-2">Founder & Lead Developer</p>
            <p className="mb-4">
              With over 5 years of experience in web development and cybersecurity, Yogendra has led numerous successful
              projects for clients across various industries.
            </p>
            <p className="mb-6">
              Specializing in React, Next.js, and modern web technologies, he founded StandaloneCoders to provide
              comprehensive technology solutions that help businesses thrive in the digital landscape.
            </p>
            <div className="flex gap-4">
              <Link href="https://www.linkedin.com/in/yogendrasingh-dev/" className="text-blue-600 hover:underline">
                LinkedIn
              </Link>
              <Link href="https://github.com/yogendra-singh-rathore" className="text-blue-600 hover:underline">
                GitHub
              </Link>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-6">
          Our mission is to empower businesses with technology solutions that drive growth, enhance customer experience,
          and streamline operations. We believe in creating websites and applications that are not just visually
          appealing but also functional and user-friendly.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <p className="mb-6">
          Our team consists of experienced developers, designers, and digital strategists who are passionate about
          creating exceptional digital experiences. We stay updated with the latest technologies and trends to deliver
          cutting-edge solutions.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
        <p className="mb-6">
          We follow a collaborative approach, working closely with our clients to understand their unique needs and
          challenges. Our process involves thorough research, strategic planning, creative design, and meticulous
          development to ensure the final product exceeds expectations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">100+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">50+</h3>
            <p>Happy Clients</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">5+</h3>
            <p>Years of Experience</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Create a server component wrapper that uses Suspense
export default function AboutUs() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12">Loading about page...</div>}>
      <AboutUsClient />
    </Suspense>
  )
}
