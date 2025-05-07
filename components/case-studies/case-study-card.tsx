"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ResponsiveImage } from "@/components/responsive-image"
import type { CaseStudy } from "@/types/case-study"

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const { title, slug, image, industry, summary, tags } = caseStudy

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className="relative h-48">
          <ResponsiveImage
            src={image}
            alt={title}
            fill={true}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-3">
            <Badge variant="secondary" className="mb-2">
              {industry}
            </Badge>
          </div>
          <h3 className="text-xl font-bold mb-3">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{summary}</p>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded-full text-gray-600 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <Button asChild variant="outline" className="w-full">
            <Link href={`/case-studies/${slug}`}>
              Read Case Study <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
