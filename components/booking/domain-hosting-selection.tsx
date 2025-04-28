"use client"

import { useState } from "react"
import { Search, ExternalLink, Check, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock domain providers
const domainProviders = [
  { id: "godaddy", name: "GoDaddy", basePrice: 899, url: "https://www.godaddy.com" },
  { id: "namecheap", name: "Namecheap", basePrice: 799, url: "https://www.namecheap.com" },
  { id: "hostinger", name: "Hostinger", basePrice: 699, url: "https://www.hostinger.in" },
  { id: "bigrock", name: "BigRock", basePrice: 849, url: "https://www.bigrock.in" },
  { id: "google", name: "Google Domains", basePrice: 999, url: "https://domains.google" },
]

// Mock hosting packages
const hostingPackages = {
  shared: [
    {
      id: "hostinger-basic",
      provider: "Hostinger",
      name: "Basic Shared Hosting",
      price: 149,
      priceUnit: "month",
      features: [
        "1 Website",
        "30 GB SSD Storage",
        "100 GB Bandwidth",
        "1 Email Account",
        "Free SSL Certificate",
        "99.9% Uptime Guarantee",
      ],
      popular: false,
      url: "https://www.hostinger.in/web-hosting",
    },
    {
      id: "hostinger-premium",
      provider: "Hostinger",
      name: "Premium Shared Hosting",
      price: 249,
      priceUnit: "month",
      features: [
        "100 Websites",
        "100 GB SSD Storage",
        "Unlimited Bandwidth",
        "100 Email Accounts",
        "Free SSL Certificate",
        "Free Domain (1 year)",
        "99.9% Uptime Guarantee",
      ],
      popular: true,
      url: "https://www.hostinger.in/web-hosting",
    },
    {
      id: "bluehost-basic",
      provider: "Bluehost",
      name: "Basic Shared Hosting",
      price: 199,
      priceUnit: "month",
      features: [
        "1 Website",
        "50 GB SSD Storage",
        "Unmetered Bandwidth",
        "5 Email Accounts",
        "Free SSL Certificate",
        "99.9% Uptime Guarantee",
      ],
      popular: false,
      url: "https://www.bluehost.com/hosting/shared",
    },
  ],
  wordpress: [
    {
      id: "wp-engine-startup",
      provider: "WP Engine",
      name: "Startup WordPress Hosting",
      price: 499,
      priceUnit: "month",
      features: [
        "1 WordPress Site",
        "10 GB Storage",
        "50 GB Bandwidth",
        "Free SSL Certificate",
        "CDN Included",
        "Automated Backups",
        "24/7 Support",
      ],
      popular: false,
      url: "https://wpengine.com/plans/",
    },
    {
      id: "kinsta-starter",
      provider: "Kinsta",
      name: "Starter WordPress Hosting",
      price: 599,
      priceUnit: "month",
      features: [
        "1 WordPress Site",
        "10 GB Storage",
        "100 GB Bandwidth",
        "Free SSL Certificate",
        "CDN Included",
        "Daily Backups",
        "24/7 Support",
      ],
      popular: true,
      url: "https://kinsta.com/plans/",
    },
  ],
  vps: [
    {
      id: "digitalocean-basic",
      provider: "DigitalOcean",
      name: "Basic Droplet",
      price: 399,
      priceUnit: "month",
      features: [
        "1 vCPU",
        "1 GB RAM",
        "25 GB SSD Storage",
        "1 TB Transfer",
        "Global Data Centers",
        "99.99% Uptime SLA",
      ],
      popular: false,
      url: "https://www.digitalocean.com/pricing",
    },
    {
      id: "linode-standard",
      provider: "Linode",
      name: "Standard Linode",
      price: 499,
      priceUnit: "month",
      features: [
        "1 vCPU",
        "2 GB RAM",
        "50 GB SSD Storage",
        "2 TB Transfer",
        "40 Gbps Network In",
        "Global Data Centers",
      ],
      popular: true,
      url: "https://www.linode.com/pricing/",
    },
  ],
}

export default function DomainHostingSelection({ formData, updateFormData }) {
  const [domainSearch, setDomainSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [activeHostingTab, setActiveHostingTab] = useState("shared")

  const handleDomainSearch = () => {
    if (!domainSearch) return

    setIsSearching(true)

    // Simulate API call to search domains
    setTimeout(() => {
      const tlds = [".com", ".net", ".org", ".in", ".co.in"]
      const results = tlds.map((tld) => {
        const domain = `${domainSearch}${tld}`
        const isAvailable = Math.random() > 0.3 // Randomly determine availability

        return {
          domain,
          available: isAvailable,
          prices: domainProviders.map((provider) => ({
            provider: provider.id,
            providerName: provider.name,
            price: provider.basePrice + Math.floor(Math.random() * 200), // Random price variation
            url: `${provider.url}/domain-search?domain=${domain}`,
          })),
        }
      })

      setSearchResults(results)
      setIsSearching(false)
    }, 1500)
  }

  const handleDomainSelect = (domain, provider, price) => {
    updateFormData({
      domainName: domain,
      domainProvider: provider.providerName,
      domainPrice: price,
    })
  }

  const handleHostingSelect = (packageId, packageCategory) => {
    const hostingPackage = hostingPackages[packageCategory].find((p) => p.id === packageId)
    if (!hostingPackage) return

    updateFormData({
      hostingPackage: hostingPackage.name,
      hostingProvider: hostingPackage.provider,
      hostingPrice: hostingPackage.price * 12, // Annual price
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium mb-2">Domain Name Search</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Search for available domain names and compare prices from different providers.
        </p>

        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Enter your domain name..."
              className="pl-9"
              value={domainSearch}
              onChange={(e) => setDomainSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleDomainSearch()}
            />
          </div>
          <Button onClick={handleDomainSearch} disabled={isSearching}>
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>

        {isSearching ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Searching for domains...</p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="space-y-4">
            {searchResults.map((result) => (
              <Card key={result.domain} className={result.available ? "border-green-200" : "border-red-200"}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <h3 className="text-lg font-bold">{result.domain}</h3>
                      {result.available ? (
                        <Badge className="ml-2 bg-green-500">Available</Badge>
                      ) : (
                        <Badge className="ml-2 bg-red-500">Taken</Badge>
                      )}
                    </div>
                  </div>

                  {result.available && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">Available at:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {result.prices.map((price) => (
                          <div key={price.provider} className="flex items-center justify-between p-2 border rounded-md">
                            <span>{price.providerName}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">₹{price.price}/year</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDomainSelect(result.domain, price, price.price)}
                              >
                                Select
                              </Button>
                              <a
                                href={price.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}

        {formData.domainName && (
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <h3 className="font-medium flex items-center text-green-700 dark:text-green-400">
              <Check className="h-5 w-5 mr-2" /> Selected Domain
            </h3>
            <p className="mt-1">
              <span className="font-medium">{formData.domainName}</span> from {formData.domainProvider} - ₹
              {formData.domainPrice}/year
            </p>
          </div>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-medium mb-2">Hosting Package</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Choose a hosting package for your website. We'll redirect you to the provider for purchase.
        </p>

        <Tabs value={activeHostingTab} onValueChange={setActiveHostingTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="shared">Shared Hosting</TabsTrigger>
            <TabsTrigger value="wordpress">WordPress Hosting</TabsTrigger>
            <TabsTrigger value="vps">VPS Hosting</TabsTrigger>
          </TabsList>

          {Object.keys(hostingPackages).map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hostingPackages[category].map((pkg) => (
                  <Card
                    key={pkg.id}
                    className={`overflow-hidden ${
                      formData.hostingPackage === pkg.name ? "border-blue-500 ring-1 ring-blue-500" : ""
                    }`}
                  >
                    <CardContent className="p-0">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b relative">
                        {pkg.popular && <Badge className="absolute top-2 right-2 bg-orange-500">Popular</Badge>}
                        <h3 className="font-bold text-lg">{pkg.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">by {pkg.provider}</p>
                      </div>
                      <div className="p-4">
                        <div className="mb-4">
                          <span className="text-3xl font-bold">₹{pkg.price}</span>
                          <span className="text-gray-600 dark:text-gray-400">/{pkg.priceUnit}</span>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Billed annually (₹{pkg.price * 12}/year)
                          </p>
                        </div>

                        <ul className="space-y-2 mb-6">
                          {pkg.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex gap-2">
                          <Button className="flex-1" onClick={() => handleHostingSelect(pkg.id, category)}>
                            Select
                          </Button>
                          <Button variant="outline" asChild>
                            <a href={pkg.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                              Details <ExternalLink className="h-4 w-4 ml-1" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {formData.hostingPackage && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="font-medium flex items-center text-blue-700 dark:text-blue-400">
              <Check className="h-5 w-5 mr-2" /> Selected Hosting
            </h3>
            <p className="mt-1">
              <span className="font-medium">{formData.hostingPackage}</span> from {formData.hostingProvider} - ₹
              {formData.hostingPrice}/year
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800 dark:text-amber-400">Important Note</h3>
            <p className="text-sm text-amber-700 dark:text-amber-500 mt-1">
              Domain and hosting selections are for comparison purposes. You'll be redirected to the provider's website
              to complete your purchase separately.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
