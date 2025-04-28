import { Check } from "lucide-react"

export default function WhyChooseUs() {
  const reasons = [
    "Professional Design & Modern Code",
    "Affordable Pricing",
    "Fast Turnaround",
    "Dedicated Support",
    "100% Satisfaction Guaranteed",
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <img src="/collaborative-coding-space.png" alt="Why Choose Us" className="w-full h-auto rounded-lg shadow-xl" />
          </div>
          <div className="lg:w-1/2 lg:pl-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Choose Us</h2>
            <ul className="space-y-4">
              {reasons.map((reason, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 p-1 bg-blue-100 dark:bg-blue-900 rounded-full mr-4">
                    <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300">{reason}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <a
                href="#contact"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Get Started Today
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
