"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer } from "@/components/responsive-container"
import { ResponsiveImage } from "@/components/responsive-image"
import CaseStudyCard from "@/components/case-studies/case-study-card"
import { caseStudiesData } from "@/data/case-studies-data"
import { Suspense } from "react"

export default function CaseStudiesClientContent() {
  // Safe to use useSearchParams() here since this is a client component
  const searchParams = useSearchParams()

  // Optional: Use searchParams for filtering or sorting
  const filter = searchParams?.get("filter")
  const sort = searchParams?.get("sort")

  // Apply any filtering or sorting based on URL params
  let displayedCaseStudies = [...caseStudiesData]

  if (filter) {
    displayedCaseStudies = displayedCaseStudies.filter(
      (cs) =>
        cs.industry.toLowerCase().includes(filter.toLowerCase()) ||
        cs.tags?.some((tag) => tag.toLowerCase().includes(filter.toLowerCase())),
    )
  }

  if (sort === "date") {
    // Assuming date is in format "Month YYYY"
    displayedCaseStudies.sort((a, b) => {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
      return dateB.getTime() - dateA.getTime()
    })
  }

  return (
    <Suspense fallback={null}>
      <ResponsiveContainer>
        {/* Hero section */}
        <div className="mb-16 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Our Success Stories</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Explore how we've helped businesses across industries overcome challenges and achieve their digital goals.
          </p>
        </div>

        {/* Featured case study */}
        <div className="mb-16 bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative h-64 lg:h-auto">
              <ResponsiveImage
                src={displayedCaseStudies[0].image}
                alt={displayedCaseStudies[0].title}
                fill={true}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-4">
                Featured Case Study
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{displayedCaseStudies[0].title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{displayedCaseStudies[0].summary}</p>
              <Button asChild size="lg">
                <Link href={`/case-studies/${displayedCaseStudies[0].slug}`}>
                  Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* All case studies */}
        <h2 className="text-2xl md:text-3xl font-bold mb-8">All Case Studies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedCaseStudies.slice(1).map((caseStudy) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
          ))}
        </div>

        {/* CTA section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-4">Ready to create your own success story?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Let's discuss how we can help your business overcome challenges and achieve its goals with our tailored
            digital solutions.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </ResponsiveContainer>
    </Suspense>
  )
}
