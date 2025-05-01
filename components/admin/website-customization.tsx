"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Save, Undo, ImageIcon, Loader2, Eye, EyeOff, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"

interface WebsiteSettings {
  general: {
    siteName: string
    tagline: string
    description: string
    logo: string
    favicon: string
    contactEmail: string
    contactPhone: string
    address: string
  }
  appearance: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    fontPrimary: string
    fontSecondary: string
    borderRadius: number
    darkMode: boolean
    headerStyle: "default" | "centered" | "minimal"
    footerColumns: number
  }
  homepage: {
    heroTitle: string
    heroSubtitle: string
    heroImage: string
    showTestimonials: boolean
    showServices: boolean
    showPortfolio: boolean
    showCTA: boolean
    ctaTitle: string
    ctaText: string
    ctaButtonText: string
    ctaButtonLink: string
  }
  seo: {
    metaTitle: string
    metaDescription: string
    ogImage: string
    twitterHandle: string
    googleAnalyticsId: string
    enableIndexing: boolean
  }
  offers: {
    showOnHomepage: boolean
    showOnCheckout: boolean
    defaultDiscount: string
  }
}

const defaultSettings: WebsiteSettings = {
  general: {
    siteName: "StandaloneCoders",
    tagline: "Professional Web Development Services",
    description: "We create professional websites tailored to your business needs.",
    logo: "/standalone-coders-logo.png",
    favicon: "/abstract-tech-logo.png",
    contactEmail: "info@standalonecoders.com",
    contactPhone: "+91 9876543210",
    address: "123 Tech Park, Jaipur, Rajasthan, India",
  },
  appearance: {
    primaryColor: "#3b82f6",
    secondaryColor: "#1e40af",
    accentColor: "#f97316",
    fontPrimary: "Inter",
    fontSecondary: "Poppins",
    borderRadius: 8,
    darkMode: true,
    headerStyle: "default",
    footerColumns: 4,
  },
  homepage: {
    heroTitle: "Professional Web Development Services",
    heroSubtitle: "We create stunning websites that drive results for your business",
    heroImage: "/digital-transformation-blueprint.png",
    showTestimonials: true,
    showServices: true,
    showPortfolio: true,
    showCTA: true,
    ctaTitle: "Ready to start your project?",
    ctaText: "Contact us today to get a free quote for your website project.",
    ctaButtonText: "Get Started",
    ctaButtonLink: "/booking/flow",
  },
  seo: {
    metaTitle: "StandaloneCoders | Professional Web Development Services",
    metaDescription: "We create professional websites tailored to your business needs. Get a free quote today!",
    ogImage: "/standalone-coders-logo.png",
    twitterHandle: "@standalonecoders",
    googleAnalyticsId: "",
    enableIndexing: true,
  },
  offers: {
    showOnHomepage: true,
    showOnCheckout: true,
    defaultDiscount: "10% OFF",
  },
}

export default function WebsiteCustomization() {
  const [settings, setSettings] = useState<WebsiteSettings>(defaultSettings)
  const [originalSettings, setOriginalSettings] = useState<WebsiteSettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewMode, setPreviewMode] = useState(false)
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  // Load settings from Supabase
  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const { data, error } = await supabase
          .from("website_settings")
          .select("settings")
          .eq("section", "website")
          .single()

        if (error && error.code !== "PGRST116") {
          // PGRST116 is "no rows returned" error
          throw error
        }

        if (data?.settings) {
          const loadedSettings = data.settings as WebsiteSettings
          // Ensure the offers section exists
          if (!loadedSettings.offers) {
            loadedSettings.offers = defaultSettings.offers
          }
          setSettings(loadedSettings)
          setOriginalSettings(loadedSettings)
        } else {
          // No settings found, use defaults
          setOriginalSettings(defaultSettings)
        }
      } catch (error: any) {
        console.error("Error fetching website settings:", error)
        setError("Failed to load settings. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [supabase])

  const handleInputChange = (section: keyof WebsiteSettings, field: string, value: string | number | boolean) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value,
      },
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)

    try {
      // Check if settings already exist
      const { data: existingData } = await supabase
        .from("website_settings")
        .select("id")
        .eq("section", "website")
        .single()

      let result
      if (existingData) {
        // Update existing settings
        result = await supabase
          .from("website_settings")
          .update({ settings, updated_at: new Date() })
          .eq("id", existingData.id)
      } else {
        // Insert new settings
        result = await supabase.from("website_settings").insert([{ section: "website", settings }])
      }

      if (result.error) {
        throw result.error
      }

      setOriginalSettings(settings)
      toast({
        title: "Settings saved",
        description: "Your website settings have been successfully saved.",
      })
    } catch (error: any) {
      console.error("Error saving website settings:", error)
      setError("Failed to save settings. Please try again.")
      toast({
        title: "Error",
        description: "There was an error saving your settings.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    if (originalSettings) {
      setSettings(originalSettings)

      toast({
        title: "Changes discarded",
        description: "Your changes have been discarded.",
      })
    }
  }

  const handleResetToDefaults = () => {
    setSettings(defaultSettings)
    toast({
      title: "Reset to defaults",
      description: "Settings have been reset to default values. Click Save to apply.",
    })
  }

  const hasChanges = originalSettings && JSON.stringify(settings) !== JSON.stringify(originalSettings)

  const fontOptions = ["Inter", "Poppins", "Roboto", "Open Sans", "Lato", "Montserrat", "Raleway", "Source Sans Pro"]

  const headerStyleOptions = [
    { value: "default", label: "Default" },
    { value: "centered", label: "Centered" },
    { value: "minimal", label: "Minimal" },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading settings...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Website Customization</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)} className="gap-2">
            {previewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {previewMode ? "Hide Preview" : "Show Preview"}
          </Button>
          <Button variant="outline" onClick={handleResetToDefaults} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Reset to Defaults
          </Button>
          {hasChanges && (
            <Button variant="outline" onClick={handleReset}>
              <Undo className="mr-2 h-4 w-4" />
              Discard Changes
            </Button>
          )}
          <Button onClick={handleSave} disabled={isSaving || !hasChanges}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="offers">Special Offers</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic information about your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.general.siteName}
                    onChange={(e) => handleInputChange("general", "siteName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={settings.general.tagline}
                    onChange={(e) => handleInputChange("general", "tagline", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Site Description</Label>
                <Textarea
                  id="description"
                  value={settings.general.description}
                  onChange={(e) => handleInputChange("general", "description", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="logo"
                      value={settings.general.logo}
                      onChange={(e) => handleInputChange("general", "logo", e.target.value)}
                    />
                    <Button type="button" variant="outline" className="flex-shrink-0">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Browse
                    </Button>
                  </div>
                  {settings.general.logo && (
                    <div className="mt-2 relative h-16 w-auto border rounded-md overflow-hidden p-2 bg-white">
                      <Image
                        src={settings.general.logo || "/placeholder.svg"}
                        alt="Logo preview"
                        width={150}
                        height={50}
                        className="object-contain h-full"
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="favicon">Favicon URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="favicon"
                      value={settings.general.favicon}
                      onChange={(e) => handleInputChange("general", "favicon", e.target.value)}
                    />
                    <Button type="button" variant="outline" className="flex-shrink-0">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Browse
                    </Button>
                  </div>
                  {settings.general.favicon && (
                    <div className="mt-2 relative h-10 w-10 border rounded-md overflow-hidden bg-white">
                      <Image
                        src={settings.general.favicon || "/placeholder.svg"}
                        alt="Favicon preview"
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={settings.general.contactEmail}
                    onChange={(e) => handleInputChange("general", "contactEmail", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input
                    id="contactPhone"
                    value={settings.general.contactPhone}
                    onChange={(e) => handleInputChange("general", "contactPhone", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={settings.general.address}
                  onChange={(e) => handleInputChange("general", "address", e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <div
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor: settings.appearance.primaryColor }}
                    />
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.appearance.primaryColor}
                      onChange={(e) => handleInputChange("appearance", "primaryColor", e.target.value)}
                      className="w-full h-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <div
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor: settings.appearance.secondaryColor }}
                    />
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={settings.appearance.secondaryColor}
                      onChange={(e) => handleInputChange("appearance", "secondaryColor", e.target.value)}
                      className="w-full h-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex gap-2">
                    <div
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor: settings.appearance.accentColor }}
                    />
                    <Input
                      id="accentColor"
                      type="color"
                      value={settings.appearance.accentColor}
                      onChange={(e) => handleInputChange("appearance", "accentColor", e.target.value)}
                      className="w-full h-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fontPrimary">Primary Font</Label>
                  <Select
                    value={settings.appearance.fontPrimary}
                    onValueChange={(value) => handleInputChange("appearance", "fontPrimary", value)}
                  >
                    <SelectTrigger id="fontPrimary">
                      <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((font) => (
                        <SelectItem key={font} value={font}>
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fontSecondary">Secondary Font</Label>
                  <Select
                    value={settings.appearance.fontSecondary}
                    onValueChange={(value) => handleInputChange("appearance", "fontSecondary", value)}
                  >
                    <SelectTrigger id="fontSecondary">
                      <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((font) => (
                        <SelectItem key={font} value={font}>
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="borderRadius">Border Radius ({settings.appearance.borderRadius}px)</Label>
                <Slider
                  id="borderRadius"
                  min={0}
                  max={20}
                  step={1}
                  value={[settings.appearance.borderRadius]}
                  onValueChange={(value) => handleInputChange("appearance", "borderRadius", value[0])}
                  className="py-4"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="headerStyle">Header Style</Label>
                  <Select
                    value={settings.appearance.headerStyle}
                    onValueChange={(value: "default" | "centered" | "minimal") =>
                      handleInputChange("appearance", "headerStyle", value)
                    }
                  >
                    <SelectTrigger id="headerStyle">
                      <SelectValue placeholder="Select a style" />
                    </SelectTrigger>
                    <SelectContent>
                      {headerStyleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="footerColumns">Footer Columns</Label>
                  <Select
                    value={settings.appearance.footerColumns.toString()}
                    onValueChange={(value) => handleInputChange("appearance", "footerColumns", Number.parseInt(value))}
                  >
                    <SelectTrigger id="footerColumns">
                      <SelectValue placeholder="Select number of columns" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Switch
                    id="darkMode"
                    checked={settings.appearance.darkMode}
                    onCheckedChange={(checked) => handleInputChange("appearance", "darkMode", checked)}
                  />
                  <Label htmlFor="darkMode">Enable Dark Mode</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offers">
          <Card>
            <CardHeader>
              <CardTitle>Special Offers Settings</CardTitle>
              <CardDescription>Configure how special offers appear on your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="showOnHomepage"
                    checked={settings.offers?.showOnHomepage ?? true}
                    onCheckedChange={(checked) => handleInputChange("offers", "showOnHomepage", checked)}
                  />
                  <Label htmlFor="showOnHomepage">Show offers on homepage</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="showOnCheckout"
                    checked={settings.offers?.showOnCheckout ?? true}
                    onCheckedChange={(checked) => handleInputChange("offers", "showOnCheckout", checked)}
                  />
                  <Label htmlFor="showOnCheckout">Show offers on checkout page</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultDiscount">Default Discount</Label>
                <Input
                  id="defaultDiscount"
                  value={settings.offers?.defaultDiscount ?? "10% OFF"}
                  onChange={(e) => handleInputChange("offers", "defaultDiscount", e.target.value)}
                  placeholder="e.g., 10% OFF"
                />
                <p className="text-xs text-muted-foreground">
                  This will be used as the default discount for new offers
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="offers-management">
                  <AccordionTrigger>Manage Special Offers</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      You can manage your special offers from the dedicated Offers Management page.
                    </p>
                    <Button asChild>
                      <a href="/admin/offers">Go to Offers Management</a>
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="homepage">
          <Card>
            <CardHeader>
              <CardTitle>Homepage Settings</CardTitle>
              <CardDescription>Customize your website's homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="heroTitle">Hero Title</Label>
                <Input
                  id="heroTitle"
                  value={settings.homepage.heroTitle}
                  onChange={(e) => handleInputChange("homepage", "heroTitle", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                <Textarea
                  id="heroSubtitle"
                  value={settings.homepage.heroSubtitle}
                  onChange={(e) => handleInputChange("homepage", "heroSubtitle", e.target.value)}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="heroImage">Hero Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="heroImage"
                    value={settings.homepage.heroImage}
                    onChange={(e) => handleInputChange("homepage", "heroImage", e.target.value)}
                  />
                  <Button type="button" variant="outline" className="flex-shrink-0">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Browse
                  </Button>
                </div>
                {settings.homepage.heroImage && (
                  <div className="mt-2 relative h-40 w-full border rounded-md overflow-hidden">
                    <Image
                      src={settings.homepage.heroImage || "/placeholder.svg"}
                      alt="Hero image preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="showTestimonials"
                    checked={settings.homepage.showTestimonials}
                    onCheckedChange={(checked) => handleInputChange("homepage", "showTestimonials", checked)}
                  />
                  <Label htmlFor="showTestimonials">Show Testimonials</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="showServices"
                    checked={settings.homepage.showServices}
                    onCheckedChange={(checked) => handleInputChange("homepage", "showServices", checked)}
                  />
                  <Label htmlFor="showServices">Show Services</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="showPortfolio"
                    checked={settings.homepage.showPortfolio}
                    onCheckedChange={(checked) => handleInputChange("homepage", "showPortfolio", checked)}
                  />
                  <Label htmlFor="showPortfolio">Show Portfolio</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="showCTA"
                    checked={settings.homepage.showCTA}
                    onCheckedChange={(checked) => handleInputChange("homepage", "showCTA", checked)}
                  />
                  <Label htmlFor="showCTA">Show CTA Section</Label>
                </div>
              </div>

              {settings.homepage.showCTA && (
                <div className="border-t pt-4 mt-4 space-y-4">
                  <h3 className="font-medium">Call to Action Section</h3>

                  <div className="space-y-2">
                    <Label htmlFor="ctaTitle">CTA Title</Label>
                    <Input
                      id="ctaTitle"
                      value={settings.homepage.ctaTitle}
                      onChange={(e) => handleInputChange("homepage", "ctaTitle", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ctaText">CTA Text</Label>
                    <Textarea
                      id="ctaText"
                      value={settings.homepage.ctaText}
                      onChange={(e) => handleInputChange("homepage", "ctaText", e.target.value)}
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ctaButtonText">Button Text</Label>
                      <Input
                        id="ctaButtonText"
                        value={settings.homepage.ctaButtonText}
                        onChange={(e) => handleInputChange("homepage", "ctaButtonText", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ctaButtonLink">Button Link</Label>
                      <Input
                        id="ctaButtonLink"
                        value={settings.homepage.ctaButtonLink}
                        onChange={(e) => handleInputChange("homepage", "ctaButtonLink", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize your website for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={settings.seo.metaTitle}
                  onChange={(e) => handleInputChange("seo", "metaTitle", e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  {settings.seo.metaTitle.length}/60 characters (recommended: 50-60)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={settings.seo.metaDescription}
                  onChange={(e) => handleInputChange("seo", "metaDescription", e.target.value)}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {settings.seo.metaDescription.length}/160 characters (recommended: 150-160)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogImage">Social Media Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="ogImage"
                    value={settings.seo.ogImage}
                    onChange={(e) => handleInputChange("seo", "ogImage", e.target.value)}
                  />
                  <Button type="button" variant="outline" className="flex-shrink-0">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Browse
                  </Button>
                </div>
                {settings.seo.ogImage && (
                  <div className="mt-2 relative h-32 w-full md:w-1/2 border rounded-md overflow-hidden">
                    <Image
                      src={settings.seo.ogImage || "/placeholder.svg"}
                      alt="Social media image preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <p className="text-xs text-muted-foreground">Recommended size: 1200 x 630 pixels</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="twitterHandle">Twitter Handle</Label>
                  <Input
                    id="twitterHandle"
                    value={settings.seo.twitterHandle}
                    onChange={(e) => handleInputChange("seo", "twitterHandle", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                  <Input
                    id="googleAnalyticsId"
                    value={settings.seo.googleAnalyticsId}
                    onChange={(e) => handleInputChange("seo", "googleAnalyticsId", e.target.value)}
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="enableIndexing"
                  checked={settings.seo.enableIndexing}
                  onCheckedChange={(checked) => handleInputChange("seo", "enableIndexing", checked)}
                />
                <Label htmlFor="enableIndexing">Allow search engines to index this site</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {previewMode && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Preview how your settings will look on the website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-6 bg-white dark:bg-gray-800">
              <div className="mb-6">
                <h2 className="text-xl font-bold" style={{ color: settings.appearance.primaryColor }}>
                  {settings.general.siteName}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{settings.general.tagline}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Hero Section</h3>
                <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-700">
                  <h1 className="text-2xl font-bold mb-2" style={{ color: settings.appearance.secondaryColor }}>
                    {settings.homepage.heroTitle}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">{settings.homepage.heroSubtitle}</p>
                  <button
                    className="mt-4 px-4 py-2 rounded-md text-white"
                    style={{
                      backgroundColor: settings.appearance.primaryColor,
                      borderRadius: `${settings.appearance.borderRadius}px`,
                    }}
                  >
                    {settings.homepage.ctaButtonText}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Colors</h3>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-md mx-auto mb-2"
                      style={{ backgroundColor: settings.appearance.primaryColor }}
                    ></div>
                    <p className="text-xs">Primary</p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-md mx-auto mb-2"
                      style={{ backgroundColor: settings.appearance.secondaryColor }}
                    ></div>
                    <p className="text-xs">Secondary</p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-16 h-16 rounded-md mx-auto mb-2"
                      style={{ backgroundColor: settings.appearance.accentColor }}
                    ></div>
                    <p className="text-xs">Accent</p>
                  </div>
                </div>
              </div>

              {settings.offers?.showOnHomepage && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Special Offer Example</h3>
                  <div
                    className="border rounded-md p-4"
                    style={{
                      background: `linear-gradient(to right, ${settings.appearance.primaryColor}10, ${settings.appearance.secondaryColor}10)`,
                      borderRadius: `${settings.appearance.borderRadius}px`,
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold">Summer Special</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get a discount on your next order!</p>
                      </div>
                      <div className="text-lg font-bold" style={{ color: settings.appearance.primaryColor }}>
                        {settings.offers?.defaultDiscount}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
