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
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 pt-12 sm:pt-16 pb-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold mb-4 sm:mb-6">
              <span className="text-blue-600 dark:text-blue-400">Standalone</span>
              <span className="text-gray-900 dark:text-gray-100">Coders</span>
              <span className="text-gray-500">.in</span>
            </h3>
            <p className="text-gray-700 dark:text-gray-400 mb-6">
              Providing cybersecurity, AI, digital marketing, and complete technology solutions.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm hover:shadow"
                  aria-label={link.name}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400"
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
            <h3 className="text-xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-blue-500 dark:text-blue-400"
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
            <h3 className="text-xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-gray-100">Contact</h3>
            <address className="text-gray-700 dark:text-gray-400 not-italic space-y-3">
              <p className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-1 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                <span>Jaipur, Rajasthan, India 302001</span>
              </p>
              <p className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                <Link href="tel:+916378110608" className="hover:text-blue-600 dark:hover:text-blue-400">
                  +91 6378110608
                </Link>
              </p>
              <p className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                <Link href="mailto:Yogendra6378@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Yogendra6378@gmail.com
                </Link>
              </p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">© {currentYear} StandaloneCoders.in. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
