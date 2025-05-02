"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedImage } from "@/components/performance/enhanced-image"
import { ImageUploadWithCompression } from "@/components/admin/image-upload-with-compression"
import { ResponsiveImage } from "@/components/responsive-image"
import { OptimizedImage } from "@/components/performance/optimized-image"
import { ImageQuality, getOptimizedImageUrl } from "@/utils/image-optimization-service"

export function ImageOptimizationDemo() {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const [selectedTab, setSelectedTab] = useState("enhanced")

  // Sample images for comparison
  const sampleImages = [
    {
      title: "Original (Unoptimized)",
      src: "/digital-transformation-blueprint.png",
      description: "Original image without optimization",
    },
    {
      title: "WebP Format",
      src: getOptimizedImageUrl("/digital-transformation-blueprint.png", {
        format: "webp",
        quality: ImageQuality.HIGH,
      }),
      description: "Same image converted to WebP format",
    },
    {
      title: "Compressed JPEG",
      src: getOptimizedImageUrl("/digital-transformation-blueprint.png", {
        format: "jpeg",
        quality: ImageQuality.MEDIUM,
      }),
      description: "Compressed JPEG with medium quality",
    },
  ]

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Image Optimization Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upload & Optimize</CardTitle>
              <CardDescription>Upload an image and see the optimization in action</CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUploadWithCompression onUploadComplete={(url) => setUploadedImageUrl(url)} />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Optimized Result</CardTitle>
              <CardDescription>Your optimized image will appear here</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center min-h-[300px]">
              {uploadedImageUrl ? (
                <EnhancedImage
                  src={uploadedImageUrl}
                  alt="Optimized uploaded image"
                  width={400}
                  height={300}
                  objectFit="contain"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <p>No image uploaded yet</p>
                  <p className="text-sm mt-2">Upload an image to see the optimized result</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Image Component Comparison</h2>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="enhanced">Enhanced Image</TabsTrigger>
          <TabsTrigger value="responsive">Responsive Image</TabsTrigger>
          <TabsTrigger value="optimized">Optimized Image</TabsTrigger>
          <TabsTrigger value="nextjs">Next.js Image</TabsTrigger>
        </TabsList>

        <TabsContent value="enhanced">
          <Card>
            <CardHeader>
              <CardTitle>Enhanced Image Component</CardTitle>
              <CardDescription>
                Our most advanced image component with WebP/AVIF support, lazy loading, and blur placeholders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EnhancedImage
                  src="/digital-transformation-blueprint.png"
                  alt="Digital Transformation Blueprint"
                  width={500}
                  height={300}
                  objectFit="cover"
                  position="above-fold"
                />
                <div>
                  <h3 className="text-lg font-medium mb-2">Features:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Automatic WebP/AVIF conversion based on browser support</li>
                    <li>Blur placeholder while loading</li>
                    <li>Responsive sizing with srcSet and sizes attributes</li>
                    <li>Lazy loading for below-fold images</li>
                    <li>Error handling with fallback UI</li>
                    <li>CDN integration for global distribution</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responsive">
          <Card>
            <CardHeader>
              <CardTitle>Responsive Image Component</CardTitle>
              <CardDescription>Optimized for different screen sizes and device pixel ratios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ResponsiveImage
                  src="/digital-transformation-blueprint.png"
                  alt="Digital Transformation Blueprint"
                  width={500}
                  height={300}
                  objectFit="cover"
                />
                <div>
                  <h3 className="text-lg font-medium mb-2">Features:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Responsive sizing with different breakpoints</li>
                    <li>Optimized for different screen densities</li>
                    <li>Simple blur placeholder</li>
                    <li>Basic lazy loading</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimized">
          <Card>
            <CardHeader>
              <CardTitle>Optimized Image Component</CardTitle>
              <CardDescription>Basic optimization with quality and size controls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <OptimizedImage
                  src="/digital-transformation-blueprint.png"
                  alt="Digital Transformation Blueprint"
                  width={500}
                  height={300}
                  objectFit="cover"
                />
                <div>
                  <h3 className="text-lg font-medium mb-2">Features:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Basic image optimization</li>
                    <li>Quality control</li>
                    <li>Simple loading state</li>
                    <li>Error handling</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nextjs">
          <Card>
            <CardHeader>
              <CardTitle>Next.js Image Component</CardTitle>
              <CardDescription>Standard Next.js Image component with basic optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative h-[300px]">
                  <img
                    src="/digital-transformation-blueprint.png"
                    alt="Digital Transformation Blueprint"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Features:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Basic image optimization</li>
                    <li>Automatic sizing</li>
                    <li>No advanced features</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <h2 className="text-2xl font-bold mb-4">Format Comparison</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {sampleImages.map((image, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{image.title}</CardTitle>
              <CardDescription>{image.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <EnhancedImage src={image.src} alt={image.title} width={400} height={250} objectFit="cover" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Best Practices for Image Optimization</CardTitle>
          <CardDescription>Follow these guidelines to ensure optimal image performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-2">Format Selection</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>WebP:</strong> Best choice for most images (94% browser support)
                </li>
                <li>
                  <strong>AVIF:</strong> Best compression but limited browser support (73%)
                </li>
                <li>
                  <strong>JPEG:</strong> Good for photographs with fallback support
                </li>
                <li>
                  <strong>PNG:</strong> Use only when transparency is needed
                </li>
              </ul>

              <h3 className="text-lg font-medium mt-4 mb-2">Quality Settings</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>High (85%):</strong> For hero images and important visuals
                </li>
                <li>
                  <strong>Medium (75%):</strong> Good balance for most images
                </li>
                <li>
                  <strong>Low (60%):</strong> For thumbnails and background images
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Loading Strategies</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Priority loading:</strong> For hero and above-fold images
                </li>
                <li>
                  <strong>Lazy loading:</strong> For below-fold images
                </li>
                <li>
                  <strong>Blur placeholders:</strong> To improve perceived performance
                </li>
                <li>
                  <strong>Progressive loading:</strong> For large images
                </li>
              </ul>

              <h3 className="text-lg font-medium mt-4 mb-2">Responsive Design</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>srcSet:</strong> Provide multiple resolutions for different devices
                </li>
                <li>
                  <strong>sizes:</strong> Tell the browser how large the image will be displayed
                </li>
                <li>
                  <strong>Art direction:</strong> Different images for different screen sizes
                </li>
                <li>
                  <strong>Aspect ratio:</strong> Maintain consistent aspect ratios to prevent layout shifts
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
