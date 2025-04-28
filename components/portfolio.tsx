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
    <section id="portfolio" className="py-24 bg-white dark:bg-gray-950">
      <div className="container-custom">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-gray-900 dark:bg-gray-100 mr-2"></span>
            Our Work
          </div>
          <h2 className="section-title mx-auto">Our Portfolio</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mt-6">
            Take a look at some of our recent projects that showcase our expertise and creativity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="modern-card group overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-900 dark:text-gray-100 font-medium hover:underline"
                >
                  View Details
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#" target="_blank" rel="noopener noreferrer" className="outline-button">
            View All Projects
          </a>
        </div>
      </div>
    </section>
  )
}
