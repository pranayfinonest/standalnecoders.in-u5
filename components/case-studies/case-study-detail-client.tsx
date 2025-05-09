"use client"

import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { CaseStudy } from "@/types/case-study"

interface CaseStudyDetailClientProps {
  caseStudy: CaseStudy
  relatedCaseStudies: CaseStudy[]
}

export default function CaseStudyDetailClient({ caseStudy, relatedCaseStudies }: CaseStudyDetailClientProps) {
  const searchParams = useSearchParams()
  const referrer = searchParams.get("ref")

  // You can use the searchParams here for any client-side logic

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {referrer && (
        <div className="mb-6">
          <Link href={`/${referrer}`} className="text-blue-600 hover:underline flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to {referrer.charAt(0).toUpperCase() + referrer.slice(1)}
          </Link>
        </div>
      )}

      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{caseStudy.title}</h1>
      <p className="text-lg text-gray-600 mb-8">{caseStudy.summary}</p>

      {caseStudy.image && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <Image
            src={caseStudy.image || "/placeholder.svg"}
            alt={caseStudy.title}
            width={1200}
            height={675}
            className="w-full h-auto"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div>
          <h3 className="text-lg font-semibold mb-2">Industry</h3>
          <p>{caseStudy.industry}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Timeline</h3>
          <p>{caseStudy.timeline}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Services Provided</h3>
          <ul className="list-disc list-inside">
            {caseStudy.services?.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="prose max-w-none mb-12">
        <h2 className="text-2xl font-bold mb-4">Challenge</h2>
        <p>{caseStudy.challenge}</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Solution</h2>
        <p>{caseStudy.solution}</p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Results</h2>
        <p>{caseStudy.results}</p>
      </div>

      {caseStudy.testimonial && (
        <div className="bg-gray-50 p-6 rounded-lg mb-12">
          <blockquote className="text-lg italic mb-4">"{caseStudy.testimonial.quote}"</blockquote>
          <div className="flex items-center">
            {caseStudy.testimonial.avatar && (
              <div className="mr-4">
                <Image
                  src={caseStudy.testimonial.avatar || "/placeholder.svg"}
                  alt={caseStudy.testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
            )}
            <div>
              <p className="font-semibold">{caseStudy.testimonial.name}</p>
              <p className="text-sm text-gray-600">
                {caseStudy.testimonial.position}, {caseStudy.testimonial.company}
              </p>
            </div>
          </div>
        </div>
      )}

      {relatedCaseStudies.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCaseStudies.map((cs) => (
              <Link href={`/case-studies/${cs.slug}`} key={cs.slug} className="block group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                  {cs.image && (
                    <Image
                      src={cs.image || "/placeholder.svg"}
                      alt={cs.title}
                      width={400}
                      height={225}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-blue-600">{cs.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{cs.summary}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
