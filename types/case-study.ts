export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  avatar?: string
}

export interface ResultMetric {
  value: string
  label: string
}

export interface Results {
  metrics?: ResultMetric[]
  summary: string | string[]
  roi?: string
}

export interface CaseStudy {
  id: number
  slug: string
  title: string
  summary: string
  client: string
  industry: string
  date: string
  duration: string
  image: string
  additionalImages?: string[]
  challenge: string
  solution: string | string[]
  results: Results
  testimonial?: Testimonial
  technologies?: string[]
  tags?: string[]
  featured?: boolean
}
