"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HexColorPicker } from "react-colorful"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  className?: string
}

export function ColorPicker({ color, onChange, className = "" }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [localColor, setLocalColor] = useState(color)

  // Update local color when prop changes
  useEffect(() => {
    setLocalColor(color)
  }, [color])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalColor(e.target.value)
  }

  // Handle color picker change
  const handleColorChange = (newColor: string) => {
    setLocalColor(newColor)
  }

  // Apply color when input blurs or popover closes
  const applyColor = () => {
    // Simple validation for hex color
    if (/^#([0-9A-F]{3}){1,2}$/i.test(localColor)) {
      onChange(localColor)
    } else {
      // Revert to previous valid color
      setLocalColor(color)
    }
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-10 h-10 p-0 border-2" style={{ backgroundColor: localColor }} />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <HexColorPicker color={localColor} onChange={handleColorChange} />
          <div className="flex items-center gap-2 mt-2">
            <div className="w-8 h-8 rounded-md" style={{ backgroundColor: localColor }} />
            <Input value={localColor} onChange={handleInputChange} onBlur={applyColor} className="w-20" />
            <Button
              size="sm"
              onClick={() => {
                applyColor()
                setIsOpen(false)
              }}
            >
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <Input value={localColor} onChange={handleInputChange} onBlur={applyColor} className="w-28" />
    </div>
  )
}
