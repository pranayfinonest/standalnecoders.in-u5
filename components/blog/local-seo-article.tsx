import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { CalendarIcon, Clock, User, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import RajasthanSEOEnhancer from "@/components/seo/rajasthan-seo-enhancer"

interface LocalSEOArticleProps {
  title: string
  description: string
  city: string
  content: React.ReactNode
  author?: string
  publishDate?: string
  readTime?: string
  tags?: string[]
  relatedPosts?: {
    title: string
    slug: string
    image?: string
  }[]
  primaryKeywords?: string[]
}

export default function LocalSEOArticle({
  title,
  description,
  city,
  content,
  author = "StandaloneCoders Team",
  publishDate = new Date().toLocaleDateString(),
  readTime = "5 min read",
  tags = ["Web Development", "Digital Marketing", "Local Business"],
  relatedPosts = [],
  primaryKeywords = [],
}: LocalSEOArticleProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <RajasthanSEOEnhancer serviceName={title.toLowerCase()} primaryKeywords={primaryKeywords} />

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-gray-600 mb-6">{description}</p>

          <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4 mb-6">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{author}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>{publishDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{readTime}</span>
            </div>
          </div>

          <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-8">
            <Image src="/vibrant-tech-hub.png" alt={`${title} in ${city}, Rajasthan`} fill className="object-cover" />
          </div>
        </div>

        <article className="prose prose-lg max-w-none mb-12">{content}</article>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Link
                key={index}
                href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Link>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        {relatedPosts.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post, index) => (
                <div key={index} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.image || "/abstract-geometric-shapes.png"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-2">{post.title}</h4>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/blog/${post.slug}`}>Read More</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-blue-50 p-6 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-3">Need Web Development Services in {city}?</h3>
          <p className="text-gray-600 mb-6">
            Contact StandaloneCoders today for a free consultation and discover how our technology solutions can help
            your business thrive in {city} and across Rajasthan.
          </p>
          <Button asChild>
            <Link href="/contact">Get a Free Consultation</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
