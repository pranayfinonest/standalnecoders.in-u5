"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { HexColorPicker } from "react-colorful"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Save, RefreshCcw, Upload, Eye } from "lucide-react"

interface WebsiteCustomization {
  id?: string
  site_name: string
  tagline: string
  primary_color: string
  secondary_color: string
  accent_color: string
  logo_url: string
  show_hero: boolean
  hero_title: string
  hero_subtitle: string
  hero_image_url: string
  footer_text: string
  google_analytics_id: string
  contact_email: string
  contact_phone: string
  contact_address: string
  updated_at?: string
}

const defaultCustomization: WebsiteCustomization = {
  site_name: "StandaloneCoders",
  tagline: "Cybersecurity, AI & Digital Solutions",
  primary_color: "#3B82F6",
  secondary_color: "#1E40AF",
  accent_color: "#EF4444",
  logo_url: "/standalone-coders-logo.png",
  show_hero: true,
  hero_title: "Professional Web & Tech Solutions",
  hero_subtitle: "We build secure, scalable, and innovative digital experiences",
  hero_image_url: "/hero-image.jpg",
  footer_text: "© 2023 StandaloneCoders.in. All rights reserved.",
  google_analytics_id: "G-MEASUREMENT_ID",
  contact_email: "standalonecoders@gmail.com",
  contact_phone: "+91 6378110608",
  contact_address: "Jaipur, Rajasthan, India 302001",
}

export default function EnhancedWebsiteCustomization() {
  const [customization, setCustomization] = useState<WebsiteCustomization>(defaultCustomization)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [heroImagePreview, setHeroImagePreview] = useState<string | null>(null)
  const [activeColor, setActiveColor] = useState<"primary" | "secondary" | "accent">("primary")
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchCustomization()
  }, [])

  const fetchCustomization = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("website_customization")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1)
        .single()

      if (error) {
        console.error("Error fetching customization:", error)
        return
      }

      if (data) {
        setCustomization(data)
        setLogoPreview(data.logo_url)
        setHeroImagePreview(data.hero_image_url)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveCustomization = async () => {
    try {
      setSaving(true)

      // If we have a record, update it, otherwise insert a new one
      const { data, error } = customization.id
        ? await supabase
            .from("website_customization")
            .update({
              ...customization,
              updated_at: new Date().toISOString(),
            })
            .eq("id", customization.id)
            .select()
        : await supabase
            .from("website_customization")
            .insert({
              ...customization,
              updated_at: new Date().toISOString(),
            })
            .select()

      if (error) {
        toast({
          title: "Error saving customization",
          description: error.message,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Customization saved",
        description: "Your website customization has been updated.",
        variant: "default",
      })

      // Update the state with the returned data
      if (data && data.length > 0) {
        setCustomization(data[0])
      }

      // Generate preview if needed
      generatePreview()
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const generatePreview = () => {
    // This could connect to a preview API or generate a preview URL
    const timestamp = new Date().getTime()
    setPreviewUrl(`/api/preview?t=${timestamp}`)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomization((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setCustomization((prev) => ({ ...prev, [name]: checked }))
  }

  const handleColorChange = (color: string) => {
    setCustomization((prev) => ({ ...prev, [`${activeColor}_color`]: color }))
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: "logo" | "hero") => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${type}-${Date.now()}.${fileExt}`
      const filePath = `public/${fileName}`

      // Show local preview
      const objectUrl = URL.createObjectURL(file)
      if (type === "logo") {
        setLogoPreview(objectUrl)
      } else {
        setHeroImagePreview(objectUrl)
      }

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage.from("website-assets").upload(filePath, file, { upsert: true })

      if (error) {
        toast({
          title: "Upload failed",
          description: error.message,
          variant: "destructive",
        })
        return
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage.from("website-assets").getPublicUrl(filePath)

      // Update the customization state
      const urlKey = type === "logo" ? "logo_url" : "hero_image_url"
      setCustomization((prev) => ({ ...prev, [urlKey]: publicUrlData.publicUrl }))

      toast({
        title: "Upload successful",
        description: `${type === "logo" ? "Logo" : "Hero image"} has been uploaded.`,
        variant: "default",
      })
    } catch (error) {
      console.error("Error uploading file:", error)
      toast({
        title: "Upload error",
        description: "An unexpected error occurred during upload.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-lg">Loading customization...</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Website Customization</h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Customize your website's basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site_name">Site Name</Label>
                  <Input id="site_name" name="site_name" value={customization.site_name} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input id="tagline" name="tagline" value={customization.tagline} onChange={handleInputChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
                <Input
                  id="google_analytics_id"
                  name="google_analytics_id"
                  value={customization.google_analytics_id}
                  onChange={handleInputChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="footer_text">Footer Text</Label>
                <Textarea
                  id="footer_text"
                  name="footer_text"
                  rows={3}
                  value={customization.footer_text}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize colors and visual elements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex space-x-4 mb-4">
                    <Button
                      variant={activeColor === "primary" ? "default" : "outline"}
                      onClick={() => setActiveColor("primary")}
                      className="flex-1"
                    >
                      Primary
                    </Button>
                    <Button
                      variant={activeColor === "secondary" ? "default" : "outline"}
                      onClick={() => setActiveColor("secondary")}
                      className="flex-1"
                    >
                      Secondary
                    </Button>
                    <Button
                      variant={activeColor === "accent" ? "default" : "outline"}
                      onClick={() => setActiveColor("accent")}
                      className="flex-1"
                    >
                      Accent
                    </Button>
                  </div>

                  <div className="mb-4">
                    <HexColorPicker
                      color={customization[`${activeColor}_color`]}
                      onChange={handleColorChange}
                      className="w-full"
                    />
                    <div className="mt-2 flex items-center space-x-2">
                      <div
                        className="w-10 h-10 rounded-md border"
                        style={{ backgroundColor: customization[`${activeColor}_color`] }}
                      />
                      <Input
                        value={customization[`${activeColor}_color`]}
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="w-32"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="logo">Logo</Label>
                    <div className="mt-2 flex items-center space-x-4">
                      {logoPreview && (
                        <div className="relative w-24 h-24 border rounded-md overflow-hidden">
                          <img
                            src={logoPreview || "/placeholder.svg"}
                            alt="Logo preview"
                            className="object-contain w-full h-full"
                          />
                        </div>
                      )}
                      <label className="cursor-pointer">
                        <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 flex items-center">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Logo
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, "logo")}
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Switch
                        id="show_hero"
                        checked={customization.show_hero}
                        onCheckedChange={(checked) => handleSwitchChange("show_hero", checked)}
                      />
                      <Label htmlFor="show_hero">Show Hero Section</Label>
                    </div>

                    {customization.show_hero && (
                      <div className="space-y-4 pl-6 border-l-2 border-gray-200">
                        <div>
                          <Label htmlFor="hero_image">Hero Image</Label>
                          <div className="mt-2 flex items-center space-x-4">
                            {heroImagePreview && (
                              <div className="relative w-36 h-20 border rounded-md overflow-hidden">
                                <img
                                  src={heroImagePreview || "/placeholder.svg"}
                                  alt="Hero preview"
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            )}
                            <label className="cursor-pointer">
                              <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 flex items-center">
                                <Upload className="w-4 h-4 mr-2" />
                                Upload Image
                              </div>
                              <input
                                type="file"
                                className="hidden"
                                onChange={(e) => handleFileUpload(e, "hero")}
                                accept="image/*"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>Customize your homepage content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {customization.show_hero && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="hero_title">Hero Title</Label>
                    <Input
                      id="hero_title"
                      name="hero_title"
                      value={customization.hero_title}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
                    <Textarea
                      id="hero_subtitle"
                      name="hero_subtitle"
                      rows={3}
                      value={customization.hero_subtitle}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Update your business contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact_email">Contact Email</Label>
                  <Input
                    id="contact_email"
                    name="contact_email"
                    type="email"
                    value={customization.contact_email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_phone">Contact Phone</Label>
                  <Input
                    id="contact_phone"
                    name="contact_phone"
                    value={customization.contact_phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_address">Business Address</Label>
                <Textarea
                  id="contact_address"
                  name="contact_address"
                  rows={3}
                  value={customization.contact_address}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={fetchCustomization}
            disabled={loading || saving}
            className="flex items-center"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>

          {previewUrl && (
            <Button variant="outline" onClick={() => window.open(previewUrl, "_blank")} className="flex items-center">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          )}
        </div>

        <Button onClick={saveCustomization} disabled={saving} className="min-w-[120px] flex items-center">
          {saving ? (
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
  )
}
