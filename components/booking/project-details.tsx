"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ProjectDetails({ formData, updateFormData }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    updateFormData({ [name]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-2">Project Details</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Provide information about your project and business to help us understand your requirements.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="projectName">Project Name *</Label>
          <Input
            id="projectName"
            name="projectName"
            placeholder="e.g., Company Website Redesign"
            value={formData.projectName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business/Organization Name *</Label>
            <Input
              id="businessName"
              name="businessName"
              placeholder="Your company name"
              value={formData.businessName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessType">Business Type/Industry *</Label>
            <Input
              id="businessType"
              name="businessType"
              placeholder="e.g., E-commerce, Healthcare, Education"
              value={formData.businessType}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contactName">Contact Person *</Label>
            <Input
              id="contactName"
              name="contactName"
              placeholder="Your full name"
              value={formData.contactName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone *</Label>
            <Input
              id="contactPhone"
              name="contactPhone"
              placeholder="Your phone number"
              value={formData.contactPhone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactEmail">Contact Email *</Label>
          <Input
            id="contactEmail"
            name="contactEmail"
            type="email"
            placeholder="Your email address"
            value={formData.contactEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectDescription">Project Description *</Label>
          <Textarea
            id="projectDescription"
            name="projectDescription"
            placeholder="Describe your project, goals, target audience, and any specific requirements"
            rows={5}
            value={formData.projectDescription}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  )
}
