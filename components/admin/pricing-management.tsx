"use client"

import { Badge } from "@/components/ui/badge"

import type React from "react"

import { useState, useEffect } from "react"
import { PlusCircle, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

interface PricingTier {
  id: string
  name: string
  description: string
  price: number
  features: string[]
  isActive: boolean
}

export default function PricingManagement() {
  const { toast } = useToast()
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentTier, setCurrentTier] = useState<PricingTier | null>(null)
  const [formData, setFormData] = useState<Partial<PricingTier>>({
    name: "",
    description: "",
    price: 0,
    features: [],
    isActive: true,
  })
  const [newFeature, setNewFeature] = useState("")

  // Load pricing tiers from localStorage (in a real app, this would be from an API)
  useEffect(() => {
    const storedTiers = localStorage.getItem("pricingTiers")
    if (storedTiers) {
      setPricingTiers(JSON.parse(storedTiers))
    } else {
      // Set some default pricing tiers if none exist
      const defaultTiers = [
        {
          id: "tier-1",
          name: "Basic",
          description: "Essential features for small websites",
          price: 199,
          features: ["5 Pages", "Basic SEO", "Contact Form"],
          isActive: true,
        },
        {
          id: "tier-2",
          name: "Professional",
          description: "Advanced features for growing businesses",
          price: 499,
          features: ["10 Pages", "Advanced SEO", "Blog Integration", "Analytics"],
          isActive: true,
        },
      ] as PricingTier[]

      setPricingTiers(defaultTiers)
      localStorage.setItem("pricingTiers", JSON.stringify(defaultTiers))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: Number.parseFloat(value) || 0 })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked })
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
      description: "",
      price: 0,
      features: [],
      isActive: true,
    })
    setCurrentTier(null)
    setNewFeature("")
  }

  const handleAddTier = () => {
    setIsDialogOpen(true)
    resetForm()
  }

  const handleEditTier = (tier: PricingTier) => {
    setCurrentTier(tier)
    setFormData({ ...tier })
    setIsDialogOpen(true)
  }

  const handleDeleteTier = (id: string) => {
    const updatedTiers = pricingTiers.filter((tier) => tier.id !== id)
    setPricingTiers(updatedTiers)
    localStorage.setItem("pricingTiers", JSON.stringify(updatedTiers))

    toast({
      title: "Pricing tier deleted",
      description: "The pricing tier has been successfully deleted.",
    })
  }

  const handleToggleActive = (id: string, isActive: boolean) => {
    const updatedTiers = pricingTiers.map((tier) => (tier.id === id ? { ...tier, isActive } : tier))
    setPricingTiers(updatedTiers)
    localStorage.setItem("pricingTiers", JSON.stringify(updatedTiers))

    toast({
      title: isActive ? "Pricing tier activated" : "Pricing tier deactivated",
      description: `The pricing tier has been ${isActive ? "activated" : "deactivated"}.`,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate form
      if (!formData.name || !formData.price) {
        throw new Error("Please fill in all required fields")
      }

      let updatedTiers: PricingTier[]

      if (currentTier) {
        // Update existing tier
        updatedTiers = pricingTiers.map((tier) =>
          tier.id === currentTier.id ? ({ ...tier, ...formData } as PricingTier) : tier,
        )

        toast({
          title: "Pricing tier updated",
          description: "The pricing tier has been successfully updated.",
        })
      } else {
        // Add new tier
        const newTier = {
          ...formData,
          id: `tier-${Date.now()}`,
        } as PricingTier

        updatedTiers = [...pricingTiers, newTier]

        toast({
          title: "Pricing tier added",
          description: "The new pricing tier has been successfully added.",
        })
      }

      setPricingTiers(updatedTiers)
      localStorage.setItem("pricingTiers", JSON.stringify(updatedTiers))
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pricing Management</h2>
        <Button onClick={handleAddTier}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Tier
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pricing Tiers</CardTitle>
          <CardDescription>Manage your pricing tiers and features</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingTiers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No pricing tiers found. Create your first tier.
                  </TableCell>
                </TableRow>
              ) : (
                pricingTiers.map((tier) => (
                  <TableRow key={tier.id}>
                    <TableCell className="font-medium">{tier.name}</TableCell>
                    <TableCell>₹{tier.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <ul className="list-disc list-inside">
                        {tier.features?.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>
                      <Badge variant={tier.isActive ? "default" : "outline"}>
                        {tier.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleActive(tier.id, !tier.isActive)}
                          title={tier.isActive ? "Deactivate" : "Activate"}
                        >
                          {tier.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEditTier(tier)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteTier(tier.id)}>
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
            <DialogTitle>{currentTier ? "Edit Pricing Tier" : "Add New Pricing Tier"}</DialogTitle>
            <DialogDescription>
              {currentTier
                ? "Update the details of your pricing tier."
                : "Create a new pricing tier for your services."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tier Name *</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
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
              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : currentTier ? "Update Tier" : "Add Tier"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
