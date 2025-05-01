import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, MapPin, Star, Users, Building, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import RajasthanSEOEnhancer from "@/components/seo/rajasthan-seo-enhancer"

interface CityLandingPageProps {
  city: string
  services?: {
    title: string
    description: string
    icon?: React.ReactNode
    link: string
  }[]
  testimonials?: {
    name: string
    company: string
    text: string
    rating: number
  }[]
  faqs?: {
    question: string
    answer: string
  }[]
  primaryKeywords?: string[]
}

export default function CityLandingPage({
  city,
  services = [],
  testimonials = [],
  faqs = [],
  primaryKeywords = [],
}: CityLandingPageProps) {
  const defaultServices = [
    {
      title: "Web Development",
      description: `Professional website development services in ${city}, Rajasthan. We create responsive, SEO-friendly websites tailored to your business needs.`,
      icon: <Building className="h-6 w-6 text-blue-600" />,
      link: `/services/website-development/${city.toLowerCase()}`,
    },
    {
      title: "Mobile App Development",
      description: `Custom mobile app development for businesses in ${city}. Native and cross-platform solutions for iOS and Android.`,
      icon: <Phone className="h-6 w-6 text-blue-600" />,
      link: `/services/app-development/${city.toLowerCase()}`,
    },
    {
      title: "Digital Marketing",
      description: `Boost your online presence in ${city} with our comprehensive digital marketing services including SEO, social media, and PPC.`,
      icon: <Users className="h-6 w-6 text-blue-600" />,
      link: `/services/digital-marketing/${city.toLowerCase()}`,
    },
  ]

  const allServices = services.length > 0 ? services : defaultServices

  const defaultTestimonials = [
    {
      name: "Rajesh Sharma",
      company: `${city} Enterprises`,
      text: `StandaloneCoders transformed our business in ${city}. Their web development expertise helped us reach more customers and streamline our operations.`,
      rating: 5,
    },
    {
      name: "Priya Jain",
      company: "Local Business Owner",
      text: `As a small business owner in ${city}, I needed an affordable yet professional website. StandaloneCoders delivered beyond my expectations.`,
      rating: 5,
    },
    {
      name: "Amit Patel",
      company: `${city} Tech Solutions`,
      text: "The team at StandaloneCoders is highly professional and responsive. They understood our requirements perfectly and delivered on time.",
      rating: 4,
    },
  ]

  const allTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials

  const defaultFaqs = [
    {
      question: `How much does website development cost in ${city}?`,
      answer: `Website development costs in ${city} vary based on your requirements. Our basic packages start at ₹24,999, while more complex e-commerce solutions start at ₹99,999. We offer customized quotes based on your specific needs.`,
    },
    {
      question: `Do you provide ongoing support for businesses in ${city}?`,
      answer: `Yes, we offer comprehensive maintenance and support packages for all our clients in ${city} and across Rajasthan. Our support includes regular updates, security patches, content updates, and technical assistance.`,
    },
    {
      question: `How long does it take to develop a website for a business in ${city}?`,
      answer: `The timeline depends on the complexity of your project. A basic website typically takes 2-4 weeks, while more complex websites or e-commerce platforms can take 8-12 weeks. We work closely with our ${city} clients to establish realistic timelines.`,
    },
    {
      question: `Can you help with digital marketing for my ${city}-based business?`,
      answer: `We offer comprehensive digital marketing services tailored for businesses in ${city}, including local SEO, Google My Business optimization, social media marketing, and PPC campaigns targeted to your local audience.`,
    },
    {
      question: `Do you have experience working with businesses in ${city}?`,
      answer: `Yes, we have extensive experience working with various businesses in ${city} and across Rajasthan. Our portfolio includes projects for local retailers, service providers, educational institutions, and more.`,
    },
  ]

  const allFaqs = faqs.length > 0 ? faqs : defaultFaqs

  return (
    <div className="container mx-auto px-4 py-12">
      <RajasthanSEOEnhancer serviceName="web and software development services" primaryKeywords={primaryKeywords} />

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center px-4 py-1 mb-4 bg-blue-100 text-blue-800 rounded-full">
          <MapPin className="h-4 w-4 mr-2" />
          <span>Serving {city} and all of Rajasthan</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Top Web & Software Development Services in {city}, Rajasthan
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          StandaloneCoders provides cutting-edge technology solutions for businesses in {city}. From custom web
          development to mobile apps and digital marketing, we help your business thrive.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/contact">Get a Free Consultation</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/portfolio">View Our {city} Projects</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Why Choose StandaloneCoders in {city}?</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Local Expertise</h3>
                <p className="text-gray-600">
                  We understand the {city} market and provide solutions tailored to local businesses and customers.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Affordable Pricing</h3>
                <p className="text-gray-600">
                  Competitive rates designed specifically for the {city} market without compromising on quality.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Proven Results</h3>
                <p className="text-gray-600">
                  Numerous success stories from {city} businesses that have grown with our technology solutions.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg">Ongoing Support</h3>
                <p className="text-gray-600">
                  Dedicated support team available for {city} clients, ensuring your digital assets are always
                  performing optimally.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/vibrant-tech-hub.png"
            alt={`StandaloneCoders office serving ${city}, Rajasthan`}
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Our Services in {city}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allServices.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">{service.icon || <Building className="h-6 w-6 text-blue-600" />}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={service.link}>Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-16 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-10">What {city} Businesses Say About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allTestimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Industries We Serve in {city}</h2>
        <Tabs defaultValue="retail">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="retail">Retail</TabsTrigger>
            <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="hospitality">Hospitality</TabsTrigger>
            <TabsTrigger value="manufacturing">Manufacturing</TabsTrigger>
          </TabsList>
          <TabsContent value="retail" className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Retail Solutions in {city}</h3>
            <p className="mb-4">
              We help retail businesses in {city} establish a strong online presence with e-commerce websites, inventory
              management systems, and digital marketing strategies to attract local customers.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>E-commerce websites with local delivery options</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Inventory management systems</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Local SEO for {city} customers</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Customer loyalty programs</span>
              </li>
            </ul>
            <Button asChild>
              <Link href="/industries/retail">Learn More About Retail Solutions</Link>
            </Button>
          </TabsContent>
          <TabsContent value="healthcare" className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Healthcare Solutions in {city}</h3>
            <p className="mb-4">
              Our healthcare solutions help medical practices in {city} streamline patient management, appointment
              scheduling, and secure data handling while maintaining compliance.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Patient management systems</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Online appointment booking</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Secure patient portals</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>Telemedicine solutions</span>
              </li>
            </ul>
            <Button asChild>
              <Link href="/industries/healthcare">Learn More About Healthcare Solutions</Link>
            </Button>
          </TabsContent>
          <TabsContent value="education" className="p-6 bg-gray-50 rounded-lg">
            {/* Similar content for education */}
            <h3 className="text-2xl font-bold mb-4">Education Solutions in {city}</h3>
            <p className="mb-4">
              We provide educational institutions in {city} with learning management systems, student portals, and
              administrative tools to enhance the learning experience.
            </p>
            <Button asChild>
              <Link href="/industries/education">Learn More About Education Solutions</Link>
            </Button>
          </TabsContent>
          <TabsContent value="hospitality" className="p-6 bg-gray-50 rounded-lg">
            {/* Similar content for hospitality */}
            <h3 className="text-2xl font-bold mb-4">Hospitality Solutions in {city}</h3>
            <p className="mb-4">
              Our solutions for hotels and restaurants in {city} include booking systems, customer management, and
              marketing strategies to attract tourists and locals.
            </p>
            <Button asChild>
              <Link href="/industries/hospitality">Learn More About Hospitality Solutions</Link>
            </Button>
          </TabsContent>
          <TabsContent value="manufacturing" className="p-6 bg-gray-50 rounded-lg">
            {/* Similar content for manufacturing */}
            <h3 className="text-2xl font-bold mb-4">Manufacturing Solutions in {city}</h3>
            <p className="mb-4">
              We help manufacturing businesses in {city} with inventory management, supply chain optimization, and
              digital transformation strategies.
            </p>
            <Button asChild>
              <Link href="/industries/manufacturing">Learn More About Manufacturing Solutions</Link>
            </Button>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions by {city} Businesses</h2>
        <div className="space-y-6 max-w-4xl mx-auto">
          {allFaqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-8 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Grow Your {city} Business?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Contact us today for a free consultation and discover how our technology solutions can help your business
          thrive in {city} and beyond.
        </p>
        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
          <Link href="/contact">Get Started Today</Link>
        </Button>
      </div>
    </div>
  )
}
