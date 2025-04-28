import Image from "next/image"

export default function Portfolio() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-featured online store with payment integration, inventory management, and customer analytics.",
      image: "/blue-ecommerce-dashboard.png",
    },
    {
      title: "Mobile Banking App",
      description:
        "Secure and intuitive banking application with real-time transaction tracking and budget management.",
      image: "/blue-mobile-banking.png",
    },
    {
      title: "Healthcare Portal",
      description:
        "Comprehensive patient management system with appointment scheduling and medical record integration.",
      image: "/blue-health-overview.png",
    },
  ]

  return (
    <section id="portfolio" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Portfolio</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Take a look at some of our recent projects that showcase our expertise and creativity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="relative h-64">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
                <a href="#" className="inline-block mt-4 text-blue-600 dark:text-blue-400 font-medium hover:underline">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="px-8 py-4 bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 font-medium rounded-lg shadow-lg hover:shadow-xl border border-blue-200 dark:border-gray-700 transition-all transform hover:-translate-y-1"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  )
}
