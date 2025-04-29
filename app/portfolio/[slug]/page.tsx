import { Suspense } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const dynamic = "force-static"

// This is a simple mapping of slugs to project data
// In a real application, this would come from a database or CMS
const projectData = {
  "ecommerce-platform": {
    title: "E-Commerce Platform",
    image: "/blue-ecommerce-dashboard.png",
    description: "A comprehensive e-commerce solution with inventory management and payment processing.",
    challenge:
      "The client needed a scalable e-commerce platform that could handle thousands of products and integrate with their existing inventory management system.",
    solution:
      "We developed a custom e-commerce platform using Next.js and a headless CMS, with real-time inventory updates and seamless payment processing integration.",
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Stripe", "AWS"],
    results:
      "The platform increased sales by 45% in the first quarter after launch, with a 30% reduction in cart abandonment rates.",
  },
  "banking-app": {
    title: "Banking Mobile App",
    image: "/blue-mobile-banking.png",
    description: "Secure mobile banking application with biometric authentication and transaction tracking.",
    challenge:
      "The bank needed a secure, user-friendly mobile application that would allow customers to perform all banking operations remotely.",
    solution:
      "We built a native mobile application with biometric authentication, real-time transaction tracking, and comprehensive security features.",
    technologies: ["React Native", "Node.js", "PostgreSQL", "AWS", "OAuth 2.0"],
    results:
      "The app achieved a 4.8/5 rating on app stores, with 80% of customers adopting mobile banking within 6 months of launch.",
  },
  "healthcare-dashboard": {
    title: "Healthcare Dashboard",
    image: "/blue-health-overview.png",
    description: "Interactive dashboard for healthcare providers to monitor patient data and analytics.",
    challenge:
      "Healthcare providers needed a centralized dashboard to monitor patient data, track outcomes, and identify trends across their practice.",
    solution:
      "We created an interactive dashboard with real-time data visualization, customizable reports, and HIPAA-compliant data storage.",
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL", "HIPAA-compliant AWS infrastructure"],
    results:
      "The dashboard reduced administrative time by 35% and improved patient outcome tracking by providing actionable insights to healthcare providers.",
  },
  "digital-transformation": {
    title: "Digital Transformation Blueprint",
    image: "/digital-transformation-blueprint.png",
    description: "Strategic roadmap for businesses undergoing digital transformation initiatives.",
    challenge:
      "A traditional manufacturing company needed a comprehensive strategy to modernize their operations and customer interactions through digital technologies.",
    solution:
      "We developed a phased digital transformation blueprint, including technology stack recommendations, process redesigns, and change management strategies.",
    technologies: ["Digital Strategy", "Process Optimization", "Cloud Migration", "IoT Integration"],
    results:
      "The client successfully implemented the first phase of their digital transformation, resulting in a 25% increase in operational efficiency.",
  },
  "collaborative-coding": {
    title: "Collaborative Coding Platform",
    image: "/collaborative-coding-space.png",
    description: "Real-time collaborative coding environment for remote development teams.",
    challenge:
      "A software development company with distributed teams needed a platform for real-time code collaboration and pair programming.",
    solution:
      "We built a collaborative coding environment with real-time editing, integrated version control, and communication tools.",
    technologies: ["WebSockets", "React", "Node.js", "MongoDB", "Git Integration"],
    results:
      "The platform reduced development time by 20% and improved code quality through increased collaboration among team members.",
  },
  "portfolio-design": {
    title: "Modern Portfolio Design",
    image: "/modern-portfolio-design.png",
    description: "Sleek and responsive portfolio website design for creative professionals.",
    challenge:
      "A group of creative professionals needed a distinctive online portfolio to showcase their work and attract potential clients.",
    solution:
      "We designed and developed a modern, responsive portfolio website with advanced filtering, animations, and contact integration.",
    technologies: ["React", "Next.js", "Framer Motion", "Tailwind CSS", "Headless CMS"],
    results:
      "The portfolio website increased client inquiries by 60% and provided a professional online presence for the creative team.",
  },
}

export default function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const project = projectData[params.slug]

  if (!project) {
    return notFound()
  }

  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      }
    >
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/#portfolio">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{project.description}</p>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">The Challenge</h2>
              <p className="text-gray-600 dark:text-gray-400">{project.challenge}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Our Solution</h2>
              <p className="text-gray-600 dark:text-gray-400">{project.solution}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Results</h2>
              <p className="text-gray-600 dark:text-gray-400">{project.results}</p>
            </div>
          </div>

          <div className="relative h-[400px] lg:h-[600px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </Suspense>
  )
}
