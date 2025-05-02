"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EnhancedImage } from "@/components/performance/enhanced-image"
import { compressImage, CompressionQuality, estimateCompressedSize } from "@/utils/image-compression-service"
import { uploadAndOptimizeImage } from "@/utils/image-optimization-service"
import { Loader2, Upload, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface ImageUploadProps {
  onUploadComplete?: (url: string) => void
  bucket?: string
  path?: string
  maxSizeMB?: number
  acceptedFormats?: string[]
  showPreview?: boolean
}

export function ImageUploadWithCompression({
  onUploadComplete,
  bucket = "public",
  path = "images",
  maxSizeMB = 5,
  acceptedFormats = ["image/jpeg", "image/png", "image/webp"],
  showPreview = true,
}: ImageUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [compressionQuality, setCompressionQuality] = useState(CompressionQuality.HIGH)
  const [format, setFormat] = useState<"webp" | "jpeg" | "png" | "avif">("webp")
  const [useCompression, setUseCompression] = useState(true)
  const [originalSize, setOriginalSize] = useState<number>(0)
  const [compressedSize, setCompressedSize] = useState<number>(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Check file size
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `Maximum file size is ${maxSizeMB}MB`,
        variant: "destructive",
      })
      return
    }

    // Check file format
    if (!acceptedFormats.includes(selectedFile.type)) {
      toast({
        title: "Invalid file format",
        description: `Accepted formats: ${acceptedFormats.join(", ")}`,
        variant: "destructive",
      })
      return
    }

    setFile(selectedFile)
    setOriginalSize(selectedFile.size)
    setCompressedSize(estimateCompressedSize(selectedFile.size, compressionQuality, format))
    setPreview(URL.createObjectURL(selectedFile))
  }

  const handleUpload = async () => {
    if (!file) return

    try {
      setUploading(true)

      // Compress image if enabled
      const fileToUpload = useCompression
        ? await compressImage(file, {
            quality: compressionQuality,
            format,
            maxWidth: 1920,
            maxHeight: 1080,
          })
        : file

      // Upload to Supabase
      const { url, error } = await uploadAndOptimizeImage(fileToUpload, {
        path,
        bucket,
        quality: compressionQuality,
        format: format,
      })

      if (error) throw error

      toast({
        title: "Upload successful",
        description: "Image has been uploaded and optimized",
        variant: "default",
      })

      // Call callback with URL
      onUploadComplete?.(url)

      // Reset state
      setFile(null)
      setPreview(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const resetForm = () => {
    setFile(null)
    setPreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // Calculate size reduction percentage
  const sizeReduction = originalSize > 0 ? Math.round(((originalSize - compressedSize) / originalSize) * 100) : 0

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
        <CardDescription>Upload and optimize images for better performance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="image-upload">Image</Label>
          <Input
            id="image-upload"
            type="file"
            accept={acceptedFormats.join(",")}
            onChange={handleFileChange}
            ref={fileInputRef}
            className="cursor-pointer"
          />
        </div>

        {file && (
          <>
            <div className="flex items-center space-x-2">
              <Switch id="use-compression" checked={useCompression} onCheckedChange={setUseCompression} />
              <Label htmlFor="use-compression">Enable compression</Label>
            </div>

            {useCompression && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="compression-quality">Quality: {compressionQuality}%</Label>
                    <span className="text-sm text-muted-foreground">
                      Est. size: {(compressedSize / 1024).toFixed(1)} KB ({sizeReduction}% reduction)
                    </span>
                  </div>
                  <Slider
                    id="compression-quality"
                    min={30}
                    max={100}
                    step={5}
                    value={[compressionQuality]}
                    onValueChange={(value) => {
                      setCompressionQuality(value[0])
                      setCompressedSize(estimateCompressedSize(originalSize, value[0], format))
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="format">Output Format</Label>
                  <Select
                    value={format}
                    onValueChange={(value) => {
                      setFormat(value as any)
                      setCompressedSize(estimateCompressedSize(originalSize, compressionQuality, value))
                    }}
                  >
                    <SelectTrigger id="format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="webp">WebP (recommended)</SelectItem>
                      <SelectItem value="jpeg">JPEG</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="avif">AVIF (experimental)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {showPreview && preview && (
              <div className="mt-4">
                <Label>Preview</Label>
                <div className="mt-2 border rounded-md overflow-hidden w-full max-w-xs h-48">
                  <EnhancedImage src={preview} alt="Preview" fill className="w-full h-full" objectFit="contain" />
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetForm} disabled={!file || uploading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button onClick={handleUpload} disabled={!file || uploading}>
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
