import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Github, MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const serviceLinks = [
    { name: "Cybersecurity Services", href: "/services/cybersecurity" },
    { name: "Digital Marketing", href: "/services/digital-marketing" },
    { name: "AI & Technology Solutions", href: "/services/ai-technology" },
    { name: "Creative Services", href: "/services/creative-services" },
  ]

  const socialLinks = [
    { name: "Facebook", icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/standalonecoders" },
    { name: "Twitter", icon: <Twitter className="w-5 h-5" />, href: "https://twitter.com/standalonecoders" },
    { name: "Instagram", icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/standalonecoders" },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/company/standalonecoders",
    },
    { name: "GitHub", icon: <Github className="w-5 h-5" />, href: "https://github.com/standalonecoders" },
  ]

  return (
    <footer className="bg-gray-50 text-gray-700 pt-16 pb-8 border-t border-gray-200">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-6">
              <span className="text-blue-600">Standalone</span>
              <span className="text-gray-900">Coders</span>
              <span className="text-gray-500">.in</span>
            </h3>
            <p className="text-gray-700 mb-6">
              Providing cybersecurity, AI, digital marketing, and complete technology solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors p-2 bg-white rounded-full shadow-sm hover:shadow"
                  aria-label={link.name}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-700 hover:text-blue-600 transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900">Contact</h3>
            <address className="text-gray-700 not-italic space-y-3">
              <p className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-1 text-blue-500" />
                Jaipur, Rajasthan, India 302001
              </p>
              <p className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-blue-500" />
                <Link href="tel:+916378110608" className="hover:text-blue-600">
                  +91 6378110608
                </Link>
              </p>
              <p className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-blue-500" />
                <Link href="mailto:Yogendra6378@gmail.com" className="hover:text-blue-600">
                  Yogendra6378@gmail.com
                </Link>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600">© {currentYear} StandaloneCoders.in. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
