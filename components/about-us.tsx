"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

// Create a client component that safely uses useSearchParams
function AboutUsClient() {
  const searchParams = useSearchParams()
  const highlight = searchParams.get("highlight")

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About StandaloneCoders</h1>

      <div className="max-w-3xl mx-auto">
        <p className="text-lg mb-6">
          StandaloneCoders is a premier web development agency specializing in creating custom digital solutions for
          businesses of all sizes. Founded in 2018, we've helped hundreds of clients transform their online presence.
        </p>

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
