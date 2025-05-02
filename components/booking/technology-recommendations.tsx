"use client"

import { useState } from "react"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TechnologyRecommendationsProps {
  websiteType: string
  selectedFeatures: string[]
}

interface Technology {
  id: string
  name: string
  description: string
  category: string
  logo: string
  url: string
  tags: string[]
  popularity: number // 1-10 scale
  complexity: number // 1-10 scale
  matchScore?: number // Calculated match score
}

export function TechnologyRecommendations({ websiteType, selectedFeatures }: TechnologyRecommendationsProps) {
  const [activeCategory, setActiveCategory] = useState("all")

  // Technology database
  const technologies: Technology[] = [
    // Frontend Frameworks
    {
      id: "react",
      name: "React",
      description: "A JavaScript library for building user interfaces with reusable components",
      category: "frontend",
      logo: "/tech-logos/react.svg",
      url: "https://reactjs.org",
      tags: ["frontend", "javascript", "ui", "component-based", "spa"],
      popularity: 10,
      complexity: 7,
    },
    {
      id: "nextjs",
      name: "Next.js",
      description: "React framework with server-side rendering and static site generation",
      category: "frontend",
      logo: "/tech-logos/nextjs.svg",
      url: "https://nextjs.org",
      tags: ["frontend", "react", "ssr", "seo-friendly", "full-stack"],
      popularity: 9,
      complexity: 6,
    },
    {
      id: "vue",
      name: "Vue.js",
      description: "Progressive JavaScript framework for building user interfaces",
      category: "frontend",
      logo: "/tech-logos/vue.svg",
      url: "https://vuejs.org",
      tags: ["frontend", "javascript", "ui", "progressive", "spa"],
      popularity: 8,
      complexity: 5,
    },
    {
      id: "angular",
      name: "Angular",
      description: "Platform for building mobile and desktop web applications",
      category: "frontend",
      logo: "/tech-logos/angular.svg",
      url: "https://angular.io",
      tags: ["frontend", "typescript", "enterprise", "google", "spa"],
      popularity: 7,
      complexity: 8,
    },
    {
      id: "svelte",
      name: "Svelte",
      description: "Compiler-based framework that builds at compile time rather than runtime",
      category: "frontend",
      logo: "/tech-logos/svelte.svg",
      url: "https://svelte.dev",
      tags: ["frontend", "javascript", "compiler", "performance", "lightweight"],
      popularity: 7,
      complexity: 4,
    },

    // Backend Technologies
    {
      id: "nodejs",
      name: "Node.js",
      description: "JavaScript runtime for server-side applications",
      category: "backend",
      logo: "/tech-logos/nodejs.svg",
      url: "https://nodejs.org",
      tags: ["backend", "javascript", "server", "api", "runtime"],
      popularity: 10,
      complexity: 6,
    },
    {
      id: "express",
      name: "Express.js",
      description: "Fast, unopinionated, minimalist web framework for Node.js",
      category: "backend",
      logo: "/tech-logos/express.svg",
      url: "https://expressjs.com",
      tags: ["backend", "nodejs", "framework", "api", "routing"],
      popularity: 9,
      complexity: 5,
    },
    {
      id: "django",
      name: "Django",
      description: "High-level Python web framework that encourages rapid development",
      category: "backend",
      logo: "/tech-logos/django.svg",
      url: "https://www.djangoproject.com",
      tags: ["backend", "python", "framework", "admin", "batteries-included"],
      popularity: 8,
      complexity: 7,
    },
    {
      id: "laravel",
      name: "Laravel",
      description: "PHP web application framework with elegant syntax",
      category: "backend",
      logo: "/tech-logos/laravel.svg",
      url: "https://laravel.com",
      tags: ["backend", "php", "framework", "mvc", "eloquent"],
      popularity: 8,
      complexity: 7,
    },
    {
      id: "rails",
      name: "Ruby on Rails",
      description: "Server-side web application framework written in Ruby",
      category: "backend",
      logo: "/tech-logos/rails.svg",
      url: "https://rubyonrails.org",
      tags: ["backend", "ruby", "framework", "mvc", "convention-over-configuration"],
      popularity: 7,
      complexity: 6,
    },

    // Databases
    {
      id: "postgresql",
      name: "PostgreSQL",
      description: "Powerful, open source object-relational database system",
      category: "database",
      logo: "/tech-logos/postgresql.svg",
      url: "https://www.postgresql.org",
      tags: ["database", "sql", "relational", "enterprise", "scalable"],
      popularity: 9,
      complexity: 7,
    },
    {
      id: "mongodb",
      name: "MongoDB",
      description: "Document-oriented NoSQL database for modern applications",
      category: "database",
      logo: "/tech-logos/mongodb.svg",
      url: "https://www.mongodb.com",
      tags: ["database", "nosql", "document", "flexible", "json"],
      popularity: 8,
      complexity: 6,
    },
    {
      id: "mysql",
      name: "MySQL",
      description: "Open-source relational database management system",
      category: "database",
      logo: "/tech-logos/mysql.svg",
      url: "https://www.mysql.com",
      tags: ["database", "sql", "relational", "popular", "stable"],
      popularity: 9,
      complexity: 6,
    },
    {
      id: "supabase",
      name: "Supabase",
      description: "Open source Firebase alternative with PostgreSQL database",
      category: "database",
      logo: "/tech-logos/supabase.svg",
      url: "https://supabase.io",
      tags: ["database", "backend-as-service", "postgresql", "auth", "realtime"],
      popularity: 7,
      complexity: 5,
    },

    // CMS
    {
      id: "wordpress",
      name: "WordPress",
      description: "Popular content management system for websites and blogs",
      category: "cms",
      logo: "/tech-logos/wordpress.svg",
      url: "https://wordpress.org",
      tags: ["cms", "php", "blog", "plugins", "themes"],
      popularity: 10,
      complexity: 4,
    },
    {
      id: "strapi",
      name: "Strapi",
      description: "Open-source headless CMS built with Node.js",
      category: "cms",
      logo: "/tech-logos/strapi.svg",
      url: "https://strapi.io",
      tags: ["cms", "headless", "nodejs", "api", "content"],
      popularity: 8,
      complexity: 6,
    },
    {
      id: "contentful",
      name: "Contentful",
      description: "API-first content management platform",
      category: "cms",
      logo: "/tech-logos/contentful.svg",
      url: "https://www.contentful.com",
      tags: ["cms", "headless", "api", "content", "enterprise"],
      popularity: 7,
      complexity: 5,
    },

    // E-commerce
    {
      id: "shopify",
      name: "Shopify",
      description: "E-commerce platform for online stores and retail point-of-sale systems",
      category: "ecommerce",
      logo: "/tech-logos/shopify.svg",
      url: "https://www.shopify.com",
      tags: ["ecommerce", "platform", "store", "payments", "hosted"],
      popularity: 9,
      complexity: 4,
    },
    {
      id: "woocommerce",
      name: "WooCommerce",
      description: "Customizable e-commerce platform for WordPress",
      category: "ecommerce",
      logo: "/tech-logos/woocommerce.svg",
      url: "https://woocommerce.com",
      tags: ["ecommerce", "wordpress", "plugin", "store", "payments"],
      popularity: 9,
      complexity: 5,
    },
    {
      id: "magento",
      name: "Magento",
      description: "Open-source e-commerce platform written in PHP",
      category: "ecommerce",
      logo: "/tech-logos/magento.svg",
      url: "https://magento.com",
      tags: ["ecommerce", "php", "enterprise", "store", "scalable"],
      popularity: 7,
      complexity: 9,
    },

    // Styling
    {
      id: "tailwind",
      name: "Tailwind CSS",
      description: "Utility-first CSS framework for rapid UI development",
      category: "styling",
      logo: "/tech-logos/tailwind.svg",
      url: "https://tailwindcss.com",
      tags: ["css", "framework", "utility", "responsive", "customizable"],
      popularity: 9,
      complexity: 4,
    },
    {
      id: "bootstrap",
      name: "Bootstrap",
      description: "Popular CSS framework for responsive, mobile-first websites",
      category: "styling",
      logo: "/tech-logos/bootstrap.svg",
      url: "https://getbootstrap.com",
      tags: ["css", "framework", "components", "responsive", "grid"],
      popularity: 9,
      complexity: 3,
    },
    {
      id: "sass",
      name: "Sass",
      description: "CSS preprocessor with variables, nesting, and more",
      category: "styling",
      logo: "/tech-logos/sass.svg",
      url: "https://sass-lang.com",
      tags: ["css", "preprocessor", "variables", "nesting", "mixins"],
      popularity: 8,
      complexity: 5,
    },

    // Hosting
    {
      id: "vercel",
      name: "Vercel",
      description: "Platform for frontend frameworks and static sites",
      category: "hosting",
      logo: "/tech-logos/vercel.svg",
      url: "https://vercel.com",
      tags: ["hosting", "deployment", "serverless", "jamstack", "frontend"],
      popularity: 9,
      complexity: 3,
    },
    {
      id: "netlify",
      name: "Netlify",
      description: "Platform for modern web projects with continuous deployment",
      category: "hosting",
      logo: "/tech-logos/netlify.svg",
      url: "https://www.netlify.com",
      tags: ["hosting", "deployment", "serverless", "jamstack", "forms"],
      popularity: 8,
      complexity: 3,
    },
    {
      id: "aws",
      name: "AWS",
      description: "Comprehensive cloud computing platform",
      category: "hosting",
      logo: "/tech-logos/aws.svg",
      url: "https://aws.amazon.com",
      tags: ["hosting", "cloud", "enterprise", "scalable", "services"],
      popularity: 10,
      complexity: 9,
    },
  ]

  // Calculate technology match scores based on website type and features
  const calculateMatchScore = (tech: Technology): number => {
    let score = 0

    // Match by website type
    if (websiteType === "E-commerce" && tech.tags.includes("ecommerce")) {
      score += 30
    } else if (websiteType === "Blog" && tech.tags.includes("blog")) {
      score += 30
    } else if (websiteType === "Portfolio" && tech.tags.includes("frontend")) {
      score += 20
    } else if (websiteType === "Corporate" && tech.tags.includes("enterprise")) {
      score += 20
    }

    // Match by features
    selectedFeatures.forEach((feature) => {
      if (feature === "ecommerce" && tech.tags.includes("ecommerce")) {
        score += 25
      } else if (feature === "blog" && (tech.tags.includes("blog") || tech.tags.includes("cms"))) {
        score += 20
      } else if (feature === "gallery" && tech.tags.includes("frontend")) {
        score += 10
      } else if (feature === "contactForm" && tech.tags.includes("backend")) {
        score += 10
      } else if (feature === "booking" && tech.tags.includes("api")) {
        score += 15
      }
    })

    // Add points for popularity and ease of use
    score += tech.popularity * 2
    score -= tech.complexity

    return score
  }

  // Get recommended technologies with match scores
  const getRecommendedTechnologies = () => {
    return technologies
      .map((tech) => ({
        ...tech,
        matchScore: calculateMatchScore(tech),
      }))
      .sort((a, b) => b.matchScore! - a.matchScore!)
  }

  const recommendedTechnologies = getRecommendedTechnologies()

  // Filter technologies by category
  const filteredTechnologies =
    activeCategory === "all"
      ? recommendedTechnologies
      : recommendedTechnologies.filter((tech) => tech.category === activeCategory)

  // Get top recommendations by category
  const getTopByCategory = (category: string, count = 1) => {
    return recommendedTechnologies.filter((tech) => tech.category === category).slice(0, count)
  }

  const topFrontend = getTopByCategory("frontend", 1)[0]
  const topBackend = getTopByCategory("backend", 1)[0]
  const topDatabase = getTopByCategory("database", 1)[0]

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold">Recommended Technologies</h2>
        <p className="text-muted-foreground">
          Based on your website type and selected features, we recommend these technologies:
        </p>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg border">
        <h3 className="font-medium mb-3">Recommended Stack</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topFrontend && (
            <div className="flex items-center space-x-3 bg-background p-3 rounded-md">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src={topFrontend.logo || "/placeholder.svg"}
                  alt={topFrontend.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-medium">{topFrontend.name}</p>
                <p className="text-xs text-muted-foreground">Frontend</p>
              </div>
            </div>
          )}

          {topBackend && (
            <div className="flex items-center space-x-3 bg-background p-3 rounded-md">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src={topBackend.logo || "/placeholder.svg"}
                  alt={topBackend.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-medium">{topBackend.name}</p>
                <p className="text-xs text-muted-foreground">Backend</p>
              </div>
            </div>
          )}

          {topDatabase && (
            <div className="flex items-center space-x-3 bg-background p-3 rounded-md">
              <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                  src={topDatabase.logo || "/placeholder.svg"}
                  alt={topDatabase.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-medium">{topDatabase.name}</p>
                <p className="text-xs text-muted-foreground">Database</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveCategory}>
        <TabsList className="grid grid-cols-7">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="frontend">Frontend</TabsTrigger>
          <TabsTrigger value="backend">Backend</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="cms">CMS</TabsTrigger>
          <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
          <TabsTrigger value="hosting">Hosting</TabsTrigger>
        </TabsList>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTechnologies.slice(0, 9).map((tech) => (
            <Card key={tech.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="relative h-8 w-8">
                      <Image src={tech.logo || "/placeholder.svg"} alt={tech.name} fill className="object-contain" />
                    </div>
                    <CardTitle className="text-lg">{tech.name}</CardTitle>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center space-x-1 bg-muted px-2 py-1 rounded text-xs">
                          <span>Match</span>
                          <span className="font-bold">{Math.min(99, Math.round(tech.matchScore! / 2))}%</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Match score based on your website requirements</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <CardDescription>{tech.description}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-1">
                  {tech.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a
                    href={tech.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    Learn More <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Tabs>
    </div>
  )
}
