"use client"

import { notFound } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { Calendar, ArrowLeft, Clock, Tag, Briefcase, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ResponsiveContainer } from "@/components/responsive-container"
import { ResponsiveImage } from "@/components/responsive-image"
import { caseStudiesData } from "@/data/case-studies-data"
import CaseStudyParams from "@/components/case-studies/case-study-params"

interface CaseStudyPageProps {
  params: {
    slug: string
  }
}

export default function CaseStudyClientPage({ params }: CaseStudyPageProps) {
  const caseStudy = caseStudiesData.find((cs) => cs.slug === params.slug)

  if (!caseStudy) {
    notFound()
  }

  // Get related case studies (same industry or sharing tags)
  const relatedCaseStudies = caseStudiesData
    .filter((cs) => {
      // Don't include the current case study
      if (cs.slug === params.slug) return false

      // Include if same industry
      if (cs.industry === caseStudy.industry) return true

      // Include if sharing tags
      if (caseStudy.tags && cs.tags) {
        return cs.tags.some((tag) => caseStudy.tags?.includes(tag))
      }

      return false
    })
    .slice(0, 3) // Limit to 3 related case studies

  const {
    title,
    industry,
    client,
    date,
    duration,
    image,
    tags,
    challenge,
    solution,
    results,
    testimonial,
    technologies,
  } = caseStudy

  return (
    <div className="py-12 sm:py-16 md:py-20">
      {/* This component uses useSearchParams() and is properly wrapped in Suspense */}
      <Suspense fallback={null}>
        <CaseStudyParams />
      </Suspense>

      <ResponsiveContainer>
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/case-studies">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Case Studies
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content - 2/3 width on desktop */}
          <div className="lg:col-span-2">
            <div className="relative rounded-xl overflow-hidden mb-8 aspect-video">
              <ResponsiveImage
                src={image}
                alt={title}
                fill={true}
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-6">{title}</h1>

            <div className="prose prose-lg dark:prose-invert max-w-none mb-10">
              {/* Challenge Section */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
                  <p className="text-lg">{challenge}</p>
                </div>
              </section>

              {/* Solution Section */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
                <div className="space-y-4">
                  {typeof solution === "string" ? (
                    <p>{solution}</p>
                  ) : (
                    solution.map((paragraph, index) => <p key={index}>{paragraph}</p>)
                  )}
                </div>
              </section>

              {/* Results Section */}
              <section className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Results & Impact</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {results.metrics?.map((metric, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{metric.value}</p>
                        <p className="text-gray-600 dark:text-gray-400">{metric.label}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="space-y-4">
                  {typeof results.summary === "string" ? (
                    <p>{results.summary}</p>
                  ) : (
                    results.summary.map((paragraph, index) => <p key={index}>{paragraph}</p>)
                  )}
                </div>
              </section>

              {/* Testimonial Section */}
              {testimonial && (
                <section className="mb-10">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500">
                    <blockquote className="text-lg italic mb-4">"{testimonial.quote}"</blockquote>
                    <div className="flex items-center">
                      {testimonial.avatar && (
                        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                          <ResponsiveImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill={true}
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Tech Stack Section */}
              {technologies && technologies.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-2xl font-bold mb-4">Technologies Used</h2>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* CTA Section */}
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-10">
              <h3 className="text-xl font-bold mb-2">Ready to start your project?</h3>
              <p className="mb-4">
                Let's discuss how we can help your business achieve similar results with our tailored solutions.
              </p>
              <Button asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>

          {/* Sidebar - 1/3 width on desktop */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Project Details Card */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Project Details</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Briefcase className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Client</p>
                        <p className="font-medium">{client}</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Tag className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Industry</p>
                        <p className="font-medium">{industry}</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Calendar className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Completion Date</p>
                        <p className="font-medium">{date}</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Project Duration</p>
                        <p className="font-medium">{duration}</p>
                      </div>
                    </li>
                    {results.roi && (
                      <li className="flex items-start">
                        <Award className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">ROI</p>
                          <p className="font-medium">{results.roi}</p>
                        </div>
                      </li>
                    )}
                  </ul>
                </CardContent>
              </Card>

              {/* Related Case Studies */}
              {relatedCaseStudies.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Related Case Studies</h3>
                    <div className="space-y-4">
                      {relatedCaseStudies.map((related) => (
                        <Link
                          href={`/case-studies/${related.slug}`}
                          key={related.slug}
                          className="block hover:bg-gray-50 dark:hover:bg-gray-800 p-3 rounded-lg transition-colors"
                        >
                          <div className="flex items-start">
                            <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 mr-3">
                              <ResponsiveImage
                                src={related.image}
                                alt={related.title}
                                fill={true}
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium mb-1">{related.title}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{related.summary}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </ResponsiveContainer>
    </div>
  )
}
