"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { PlusCircle, Pencil, Trash2, Eye, EyeOff, ImagePlus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface Service {
  id: string
  name: string
  slug: string
  shortDescription: string
  description: string
  price: number
  discountedPrice?: number
  category: string
  image: string
  isActive: boolean
  isFeatured: boolean
  features: string[]
}

export default function ServicesManagement() {
  const { toast } = useToast()
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentService, setCurrentService] = useState<Service | null>(null)
  const [formData, setFormData] = useState<Partial<Service>>({
    name: "",
    slug: "",
    shortDescription: "",
    description: "",
    price: 0,
    discountedPrice: undefined,
    category: "",
    image: "",
    isActive: true,
    isFeatured: false,
    features: [],
  })
  const [newFeature, setNewFeature] = useState("")

  // Load services from localStorage (in a real app, this would be from an API)
  useEffect(() => {
    const storedServices = localStorage.getItem("services")
    if (storedServices) {
      setServices(JSON.parse(storedServices))
    } else {
      // Set some default services if none exist
      const defaultServices = [
        {
          id: "service-1",
          name: "Website Development",
          slug: "website-development",
          shortDescription: "Professional website development services",
          description: "We create professional websites tailored to your business needs.",
          price: 15000,
          category: "Development",
          image: "/blue-ecommerce-dashboard.png",
          isActive: true,
          isFeatured: true,
          features: ["Responsive Design", "SEO Optimization", "Content Management System"],
        },
        {
          id: "service-2",
          name: "Digital Marketing",
          slug: "digital-marketing",
          shortDescription: "Comprehensive digital marketing solutions",
          description: "Boost your online presence with our digital marketing services.",
          price: 10000,
          discountedPrice: 8500,
          category: "Marketing",
          image: "/vibrant-tech-hub.png",
          isActive: true,
          isFeatured: false,
          features: ["Social Media Marketing", "SEO", "Content Marketing", "Email Campaigns"],
        },
      ]
      setServices(defaultServices)
      localStorage.setItem("services", JSON.stringify(defaultServices))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === "name" && !currentService) {
      // Auto-generate slug from name for new services
      const slug = value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
      setFormData({ ...formData, [name]: value, slug })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: Number.parseFloat(value) || 0 })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleAddFeature = () => {
    if (newFeature.trim() && formData.features) {
      setFormData({
        ...formData,
        features: [...formData.features, newFeature.trim()],
      })
      setNewFeature("")
    }
  }

  const handleRemoveFeature = (index: number) => {
    if (formData.features) {
      const updatedFeatures = [...formData.features]
      updatedFeatures.splice(index, 1)
      setFormData({ ...formData, features: updatedFeatures })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      shortDescription: "",
      description: "",
      price: 0,
      discountedPrice: undefined,
      category: "",
      image: "",
      isActive: true,
      isFeatured: false,
      features: [],
    })
    setCurrentService(null)
    setNewFeature("")
  }

  const handleAddService = () => {
    setIsDialogOpen(true)
    resetForm()
  }

  const handleEditService = (service: Service) => {
    setCurrentService(service)
    setFormData({ ...service })
    setIsDialogOpen(true)
  }

  const handleDeleteService = (id: string) => {
    const updatedServices = services.filter((service) => service.id !== id)
    setServices(updatedServices)
    localStorage.setItem("services", JSON.stringify(updatedServices))

    toast({
      title: "Service deleted",
      description: "The service has been successfully deleted.",
    })
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    const updatedServices = services.map((service) => (service.id === id ? { ...service, isActive } : service))
    setServices(updatedServices)
    localStorage.setItem("services", JSON.stringify(updatedServices))

    toast({
      title: isActive ? "Service activated" : "Service deactivated",
      description: `The service has been ${isActive ? "activated" : "deactivated"}.`,
    })
  }

  const handleToggleFeatured = (id: string, isFeatured: boolean) => {
    const updatedServices = services.map((service) => (service.id === id ? { ...service, isFeatured } : service))
    setServices(updatedServices)
    localStorage.setItem("services", JSON.stringify(updatedServices))

    toast({
      title: isFeatured ? "Service featured" : "Service unfeatured",
      description: `The service has been ${isFeatured ? "added to" : "removed from"} featured services.`,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate form
      if (!formData.name || !formData.slug || !formData.price) {
        throw new Error("Please fill in all required fields")
      }

      let updatedServices: Service[]

      if (currentService) {
        // Update existing service
        updatedServices = services.map((service) =>
          service.id === currentService.id ? ({ ...service, ...formData } as Service) : service,
        )

        toast({
          title: "Service updated",
          description: "The service has been successfully updated.",
        })
      } else {
        // Add new service
        const newService = {
          ...formData,
          id: `service-${Date.now()}`,
        } as Service

        updatedServices = [...services, newService]

        toast({
          title: "Service added",
          description: "The new service has been successfully added.",
        })
      }

      setServices(updatedServices)
      localStorage.setItem("services", JSON.stringify(updatedServices))
      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const categories = ["Development", "Design", "Marketing", "Consulting", "Support", "Maintenance", "Other"]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Services Management</h2>
        <Button onClick={handleAddService}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Service
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Services</CardTitle>
          <CardDescription>Manage your services and packages</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No services found. Create your first service.
                  </TableCell>
                </TableRow>
              ) : (
                services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <div className="relative w-12 h-12 rounded-md overflow-hidden">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          alt={service.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {service.name}
                      {service.isFeatured && (
                        <Badge variant="outline" className="ml-2 bg-amber-500 text-white border-0">
                          Featured
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{service.category}</TableCell>
                    <TableCell>
                      {service.discountedPrice ? (
                        <div>
                          <span className="line-through text-muted-foreground">₹{service.price.toLocaleString()}</span>
                          <span className="ml-2 font-medium">₹{service.discountedPrice.toLocaleString()}</span>
                        </div>
                      ) : (
                        <span>₹{service.price.toLocaleString()}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={service.isActive ? "default" : "outline"}>
                        {service.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleActive(service.id, !service.isActive)}
                          title={service.isActive ? "Deactivate" : "Activate"}
                        >
                          {service.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleFeatured(service.id, !service.isFeatured)}
                          title={service.isFeatured ? "Remove from featured" : "Add to featured"}
                        >
                          <Badge className={`h-4 w-4 ${service.isFeatured ? "bg-amber-500" : "bg-gray-200"}`} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEditService(service)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteService(service.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{currentService ? "Edit Service" : "Add New Service"}</DialogTitle>
            <DialogDescription>
              {currentService ? "Update the details of your service." : "Create a new service for your customers."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Service Name *</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input id="slug" name="slug" value={formData.slug} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description *</Label>
                <Input
                  id="shortDescription"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Full Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleNumberInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountedPrice">Discounted Price (₹)</Label>
                  <Input
                    id="discountedPrice"
                    name="discountedPrice"
                    type="number"
                    value={formData.discountedPrice || ""}
                    onChange={handleNumberInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL *</Label>
                <div className="flex gap-2">
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="/path/to/image.jpg"
                    required
                  />
                  <Button type="button" variant="outline" className="flex-shrink-0">
                    <ImagePlus className="h-4 w-4 mr-2" />
                    Browse
                  </Button>
                </div>
                {formData.image && (
                  <div className="mt-2 relative w-20 h-20 rounded-md overflow-hidden border">
                    <Image
                      src={formData.image || "/placeholder.svg"}
                      alt="Service preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Features</Label>
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add a feature"
                  />
                  <Button type="button" onClick={handleAddFeature} className="flex-shrink-0">
                    Add
                  </Button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.features?.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {feature}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 rounded-full"
                        onClick={() => handleRemoveFeature(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onCheckedChange={(checked) => handleSwitchChange("isFeatured", checked)}
                  />
                  <Label htmlFor="isFeatured">Featured</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : currentService ? "Update Service" : "Add Service"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
