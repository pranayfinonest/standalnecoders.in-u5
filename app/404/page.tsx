export const dynamic = "force-static"

export default function Custom404Page() {
  return (
    <div className="container flex items-center justify-center min-h-[70vh] px-4 py-12">
      <div className="w-full max-w-md border-2 border-gray-200 rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">404</h1>
          <h2 className="text-xl font-semibold mb-4">Page Not Found</h2>
        </div>
        <div className="text-center">
          <p className="mb-6 text-muted-foreground">
            We're sorry, but the page you're looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Popular pages you might be looking for:</h3>
            <ul className="space-y-1 text-sm text-blue-600 dark:text-blue-400">
              <li>
                <a href="/services/website-development" className="hover:underline">
                  Website Development
                </a>
              </li>
              <li>
                <a href="/services/cybersecurity" className="hover:underline">
                  Cybersecurity Services
                </a>
              </li>
              <li>
                <a href="/services/digital-marketing" className="hover:underline">
                  Digital Marketing
                </a>
              </li>
              <li>
                <a href="/portfolio" className="hover:underline">
                  Our Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Return to Home
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}
