import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import StructuredDataEnhanced from "./structured-data-enhanced"

interface CityServicePageProps {
  city: string
  service: string
  serviceTitle: string
  serviceDescription: string
}

export default function CityServicePage({ city, service, serviceTitle, serviceDescription }: CityServicePageProps) {
  const cityName = city.charAt(0).toUpperCase() + city.slice(1)
  const title = `${serviceTitle} in ${cityName}, Rajasthan`
  const description = `Professional ${serviceDescription.toLowerCase()} services in ${cityName}, Rajasthan. Contact StandaloneCoders for expert solutions tailored to your business needs.`

  // Generate breadcrumbs for structured data
  const breadcrumbs = [
    {
      name: "Home",
      item: "https://standalonecoders.in",
    },
    {
      name: "Services",
      item: "https://standalonecoders.in/services",
    },
    {
      name: serviceTitle,
      item: `https://standalonecoders.in/services/${service}`,
    },
    {
      name: cityName,
      item: `https://standalonecoders.in/services/${service}/${city}`,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Structured Data */}
      <StructuredDataEnhanced
        type="Service"
        name={title}
        description={description}
        url={`https://standalonecoders.in/services/${service}/${city}`}
      />
      <StructuredDataEnhanced type="BreadcrumbList" breadcrumbs={breadcrumbs} />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{title}</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">{description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Why Choose StandaloneCoders in {cityName}</CardTitle>
              <CardDescription>We deliver exceptional results for businesses in {cityName}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Local expertise with global standards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Customized solutions for {cityName} businesses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Dedicated support and maintenance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Competitive pricing with maximum value</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>Fast turnaround times</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us in {cityName}</CardTitle>
              <CardDescription>Reach out to discuss your project needs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{cityName}, Rajasthan, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>+91 9876543210</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>info@standalonecoders.in</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Mon-Fri: 9:00 AM - 6:00 PM</span>
                </div>
                <Button className="w-full mt-4" asChild>
                  <Link href="/contact">Contact Us Now</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="prose dark:prose-invert max-w-none mb-12">
          <h2>
            Our {serviceTitle} Services in {cityName}
          </h2>
          <p>
            StandaloneCoders provides comprehensive {serviceDescription.toLowerCase()} services to businesses and
            organizations in {cityName}, Rajasthan. Our team of experienced professionals is dedicated to delivering
            high-quality solutions that meet your specific needs and requirements.
          </p>
          <p>
            Whether you're a small business, startup, or established enterprise in {cityName}, we have the expertise and
            resources to help you achieve your goals. Our approach is client-centered, focusing on understanding your
            unique challenges and providing tailored solutions that drive results.
          </p>

          <h3>
            Why {cityName} Businesses Choose Our {serviceTitle} Services
          </h3>
          <p>
            Businesses in {cityName} trust StandaloneCoders for their {serviceDescription.toLowerCase()} needs because
            of our proven track record of success, attention to detail, and commitment to excellence. We understand the
            local market dynamics and competitive landscape, allowing us to develop strategies that give you a
            competitive edge.
          </p>

          <h3>Our Process</h3>
          <ol>
            <li>
              <strong>Consultation:</strong> We begin with a thorough consultation to understand your business goals and
              requirements.
            </li>
            <li>
              <strong>Strategy Development:</strong> Our team develops a customized strategy tailored to your specific
              needs.
            </li>
            <li>
              <strong>Implementation:</strong> We implement the solution with precision and attention to detail.
            </li>
            <li>
              <strong>Testing and Quality Assurance:</strong> Rigorous testing ensures that everything works perfectly.
            </li>
            <li>
              <strong>Launch and Support:</strong> We provide ongoing support and maintenance after launch.
            </li>
          </ol>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Ready to Get Started?</CardTitle>
            <CardDescription>
              Contact us today to discuss your {serviceTitle.toLowerCase()} needs in {cityName}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex-1">
              <Link href="/contact">Request a Quote</Link>
            </Button>
            <Button asChild variant="outline" className="flex-1">
              <Link href={`/services/${service}`}>Learn More About Our Services</Link>
            </Button>
          </CardContent>
        </Card>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>
            StandaloneCoders provides {serviceTitle.toLowerCase()} services in {cityName} and throughout Rajasthan,
            including Jaipur, Udaipur, Jodhpur, Kota, Ajmer, Bikaner, Alwar, Bharatpur, and other cities.
          </p>
        </div>
      </div>
    </div>
  )
}
