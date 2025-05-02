"use client"

import { useState } from "react"
import Image from "next/image"
import { Maximize, Monitor, Smartphone, Tablet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TemplateShowcaseProps {
  templateId: string | number
  templateName: string
  templateImage: string
}

export function TemplateShowcase({ templateId, templateName, templateImage }: TemplateShowcaseProps) {
  const [currentView, setCurrentView] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [isOpen, setIsOpen] = useState(false)

  // Generate additional views based on the template ID
  const getViewImages = () => {
    return {
      desktop: templateImage,
      tablet: `/templates/${templateId}-tablet.png`,
      mobile: `/templates/${templateId}-mobile.png`,
    }
  }

  const viewImages = getViewImages()

  // Fallback to desktop view if other views aren't available
  const handleImageError = (view: "tablet" | "mobile") => {
    console.log(`${view} image not found, using desktop image`)
    viewImages[view] = templateImage
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">Preview {templateName}</h3>
        <div className="flex items-center space-x-2">
          <TabsList className="grid grid-cols-3 h-8">
            <TabsTrigger
              value="desktop"
              onClick={() => setCurrentView("desktop")}
              className={currentView === "desktop" ? "bg-primary text-primary-foreground" : ""}
            >
              <Monitor className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="tablet"
              onClick={() => setCurrentView("tablet")}
              className={currentView === "tablet" ? "bg-primary text-primary-foreground" : ""}
            >
              <Tablet className="h-4 w-4" />
            </TabsTrigger>
            <TabsTrigger
              value="mobile"
              onClick={() => setCurrentView("mobile")}
              className={currentView === "mobile" ? "bg-primary text-primary-foreground" : ""}
            >
              <Smartphone className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Maximize className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full">
              <div className="relative aspect-video w-full">
                <Image
                  src={viewImages[currentView] || "/placeholder.svg"}
                  alt={`${templateName} - ${currentView} view`}
                  fill
                  className="object-contain"
                  quality={90}
                  onError={() => currentView !== "desktop" && handleImageError(currentView)}
                />
              </div>
              <div className="flex justify-center mt-4">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger
                    value="desktop"
                    onClick={() => setCurrentView("desktop")}
                    className={currentView === "desktop" ? "bg-primary text-primary-foreground" : ""}
                  >
                    <Monitor className="h-4 w-4 mr-2" /> Desktop
                  </TabsTrigger>
                  <TabsTrigger
                    value="tablet"
                    onClick={() => setCurrentView("tablet")}
                    className={currentView === "tablet" ? "bg-primary text-primary-foreground" : ""}
                  >
                    <Tablet className="h-4 w-4 mr-2" /> Tablet
                  </TabsTrigger>
                  <TabsTrigger
                    value="mobile"
                    onClick={() => setCurrentView("mobile")}
                    className={currentView === "mobile" ? "bg-primary text-primary-foreground" : ""}
                  >
                    <Smartphone className="h-4 w-4 mr-2" /> Mobile
                  </TabsTrigger>
                </TabsList>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div
        className={`relative ${
          currentView === "desktop"
            ? "aspect-video w-full"
            : currentView === "tablet"
              ? "aspect-[3/4] max-w-md mx-auto"
              : "aspect-[9/16] max-w-xs mx-auto"
        }`}
      >
        <Image
          src={viewImages[currentView] || "/placeholder.svg"}
          alt={`${templateName} - ${currentView} view`}
          fill
          className="object-contain rounded-md border"
          quality={85}
          onError={() => currentView !== "desktop" && handleImageError(currentView)}
        />
      </div>
    </div>
  )
}
