import Link from "next/link"
import { ResponsiveContainer } from "@/components/responsive-container"
import { ResponsiveImage } from "@/components/responsive-image"
import { caseStudiesData } from "@/data/case-studies-data"

export default function CaseStudyList() {
  return (
    <ResponsiveContainer>
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Case Studies</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore our portfolio of successful projects and discover how we've helped businesses achieve their goals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {caseStudiesData.map((caseStudy) => (
          <Link href={`/case-studies/${caseStudy.slug}`} key={caseStudy.slug} className="group block">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
              <div className="relative aspect-video">
                <ResponsiveImage
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  fill={true}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {caseStudy.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{caseStudy.summary}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{caseStudy.industry}</span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
                    Read Case Study
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </ResponsiveContainer>
  )
}
