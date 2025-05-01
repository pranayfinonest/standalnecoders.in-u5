"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { PlusCircle, Pencil, Trash2, Calendar, Tag, Eye, EyeOff } from "lucide-react"
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

interface Offer {
  id: string
  name: string
  description: string
  code: string
  discount: string
  validUntil: string
  isNew: boolean
  isActive: boolean
  bgColor?: string
  textColor?: string
  image?: string
}

export default function OffersManagement() {
  const { toast } = useToast()
  const [offers, setOffers] = useState<Offer[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentOffer, setCurrentOffer] = useState<Offer | null>(null)
  const [formData, setFormData] = useState<Partial<Offer>>({
    name: "",
    description: "",
    code: "",
    discount: "",
    validUntil: "",
    isNew: false,
    isActive: true,
    bgColor: "bg-gradient-to-r from-blue-50 to-indigo-50",
    textColor: "text-blue-600",
  })

  // Load offers from localStorage (in a real app, this would be from an API)
  useEffect(() => {
    const storedOffers = localStorage.getItem("specialOffers")
    if (storedOffers) {
      setOffers(JSON.parse(storedOffers))
    } else {
      // Set some default offers if none exist
      const defaultOffers = [
        {
          id: "offer-1",
          name: "Summer Special",
          description: "Get 20% off on all website development packages",
          code: "SUMMER20",
          discount: "20% OFF",
          validUntil: "2023-08-31",
          isNew: true,
          isActive: true,
          bgColor: "bg-gradient-to-r from-blue-50 to-indigo-50",
          textColor: "text-blue-600",
        },
        {
          id: "offer-2",
          name: "New Client Discount",
          description: "First-time clients receive a special discount on any service",
          code: "NEWCLIENT15",
          discount: "15% OFF",
          validUntil: "2023-12-31",
          isNew: false,
          isActive: true,
          bgColor: "bg-gradient-to-r from-green-50 to-emerald-50",
          textColor: "text-emerald-600",
        },
      ]
      setOffers(defaultOffers)
      localStorage.setItem("specialOffers", JSON.stringify(defaultOffers))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      code: "",
      discount: "",
      validUntil: "",
      isNew: false,
      isActive: true,
      bgColor: "bg-gradient-to-r from-blue-50 to-indigo-50",
      textColor: "text-blue-600",
    })
    setCurrentOffer(null)
  }

  const handleAddOffer = () => {
    setIsDialogOpen(true)
    resetForm()
  }

  const handleEditOffer = (offer: Offer) => {
    setCurrentOffer(offer)
    setFormData({ ...offer })
    setIsDialogOpen(true)
  }

  const handleDeleteOffer = (id: string) => {
    const updatedOffers = offers.filter((offer) => offer.id !== id)
    setOffers(updatedOffers)
    localStorage.setItem("specialOffers", JSON.stringify(updatedOffers))

    toast({
      title: "Offer deleted",
      description: "The offer has been successfully deleted.",
    })
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    const updatedOffers = offers.map((offer) => (offer.id === id ? { ...offer, isActive } : offer))
    setOffers(updatedOffers)
    localStorage.setItem("specialOffers", JSON.stringify(updatedOffers))

    toast({
      title: isActive ? "Offer activated" : "Offer deactivated",
      description: `The offer has been ${isActive ? "activated" : "deactivated"}.`,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate form
      if (!formData.name || !formData.code || !formData.discount) {
        throw new Error("Please fill in all required fields")
      }

      let updatedOffers: Offer[]

      if (currentOffer) {
        // Update existing offer
        updatedOffers = offers.map((offer) =>
          offer.id === currentOffer.id ? ({ ...offer, ...formData } as Offer) : offer,
        )

        toast({
          title: "Offer updated",
          description: "The offer has been successfully updated.",
        })
      } else {
        // Add new offer
        const newOffer = {
          ...formData,
          id: `offer-${Date.now()}`,
        } as Offer

        updatedOffers = [...offers, newOffer]

        toast({
          title: "Offer added",
          description: "The new offer has been successfully added.",
        })
      }

      setOffers(updatedOffers)
      localStorage.setItem("specialOffers", JSON.stringify(updatedOffers))
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

  const colorOptions = [
    { value: "bg-gradient-to-r from-blue-50 to-indigo-50", label: "Blue", textColor: "text-blue-600" },
    { value: "bg-gradient-to-r from-green-50 to-emerald-50", label: "Green", textColor: "text-emerald-600" },
    { value: "bg-gradient-to-r from-purple-50 to-violet-50", label: "Purple", textColor: "text-violet-600" },
    { value: "bg-gradient-to-r from-red-50 to-rose-50", label: "Red", textColor: "text-rose-600" },
    { value: "bg-gradient-to-r from-amber-50 to-yellow-50", label: "Yellow", textColor: "text-amber-600" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Special Offers Management</h2>
        <Button onClick={handleAddOffer}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Offer
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Offers</CardTitle>
          <CardDescription>Manage your special offers and discounts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No offers found. Create your first offer.
                  </TableCell>
                </TableRow>
              ) : (
                offers.map((offer) => (
                  <TableRow key={offer.id}>
                    <TableCell className="font-medium">
                      {offer.name}
                      {offer.isNew && (
                        <Badge variant="outline" className="ml-2 bg-green-500 text-white border-0">
                          New
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-1 text-muted-foreground" />
                        <code>{offer.code}</code>
                      </div>
                    </TableCell>
                    <TableCell>{offer.discount}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        {offer.validUntil}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={offer.isActive ? "default" : "outline"}>
                        {offer.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleActive(offer.id, !offer.isActive)}
                        >
                          {offer.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEditOffer(offer)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteOffer(offer.id)}>
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentOffer ? "Edit Offer" : "Add New Offer"}</DialogTitle>
            <DialogDescription>
              {currentOffer
                ? "Update the details of your special offer."
                : "Create a new special offer for your customers."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Offer Name *</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Discount Code *</Label>
                  <Input id="code" name="code" value={formData.code} onChange={handleInputChange} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount Amount/Percentage *</Label>
                  <Input
                    id="discount"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    placeholder="e.g., 20% OFF"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validUntil">Valid Until</Label>
                  <Input
                    id="validUntil"
                    name="validUntil"
                    type="date"
                    value={formData.validUntil}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bgColor">Banner Color</Label>
                  <Select
                    value={formData.bgColor}
                    onValueChange={(value) => {
                      const selectedColor = colorOptions.find((color) => color.value === value)
                      if (selectedColor) {
                        handleSelectChange("bgColor", value)
                        handleSelectChange("textColor", selectedColor.textColor)
                      }
                    }}
                  >
                    <SelectTrigger id="bgColor">
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          {color.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Banner Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image || ""}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isNew"
                    checked={formData.isNew}
                    onCheckedChange={(checked) => handleSwitchChange("isNew", checked)}
                  />
                  <Label htmlFor="isNew">Mark as New</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : currentOffer ? "Update Offer" : "Add Offer"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
