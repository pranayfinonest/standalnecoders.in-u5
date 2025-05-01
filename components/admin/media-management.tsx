"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Upload, Trash2, Search, Filter, Grid, List, ImageIcon, FileText, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface MediaItem {
  id: string
  name: string
  url: string
  type: "image" | "document" | "other"
  size: number
  dimensions?: { width: number; height: number }
  uploadedAt: string
  tags: string[]
}

export default function MediaManagement() {
  const { toast } = useToast()
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [uploadUrl, setUploadUrl] = useState("")
  const [uploadName, setUploadName] = useState("")
  const [uploadTags, setUploadTags] = useState("")

  // Load media items from localStorage (in a real app, this would be from an API)
  useEffect(() => {
    const storedMedia = localStorage.getItem("mediaItems")
    if (storedMedia) {
      setMediaItems(JSON.parse(storedMedia))
    } else {
      // Set some default media items if none exist
      const defaultMedia = [
        {
          id: "media-1",
          name: "Website Dashboard",
          url: "/blue-ecommerce-dashboard.png",
          type: "image",
          size: 1024000,
          dimensions: { width: 1200, height: 800 },
          uploadedAt: new Date().toISOString(),
          tags: ["dashboard", "website", "ui"],
        },
        {
          id: "media-2",
          name: "Mobile Banking App",
          url: "/blue-mobile-banking.png",
          type: "image",
          size: 768000,
          dimensions: { width: 800, height: 1200 },
          uploadedAt: new Date().toISOString(),
          tags: ["mobile", "banking", "app"],
        },
        {
          id: "media-3",
          name: "Health Dashboard",
          url: "/blue-health-overview.png",
          type: "image",
          size: 1536000,
          dimensions: { width: 1600, height: 900 },
          uploadedAt: new Date().toISOString(),
          tags: ["health", "dashboard", "medical"],
        },
        {
          id: "media-4",
          name: "Tech Hub",
          url: "/vibrant-tech-hub.png",
          type: "image",
          size: 2048000,
          dimensions: { width: 1920, height: 1080 },
          uploadedAt: new Date().toISOString(),
          tags: ["tech", "hub", "vibrant"],
        },
      ] as MediaItem[]

      setMediaItems(defaultMedia)
      localStorage.setItem("mediaItems", JSON.stringify(defaultMedia))
    }
  }, [])

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!uploadUrl || !uploadName) {
        throw new Error("Please provide both URL and name for the media")
      }

      // Create new media item
      const newItem: MediaItem = {
        id: `media-${Date.now()}`,
        name: uploadName,
        url: uploadUrl,
        type: uploadUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)
          ? "image"
          : uploadUrl.match(/\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt)$/i)
            ? "document"
            : "other",
        size: 1024000, // Mock size
        dimensions: { width: 1200, height: 800 }, // Mock dimensions
        uploadedAt: new Date().toISOString(),
        tags: uploadTags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      }

      const updatedMedia = [...mediaItems, newItem]
      setMediaItems(updatedMedia)
      localStorage.setItem("mediaItems", JSON.stringify(updatedMedia))

      // Reset form
      setUploadUrl("")
      setUploadName("")
      setUploadTags("")
      setIsUploadDialogOpen(false)

      toast({
        title: "Media uploaded",
        description: "The media has been successfully added to your library.",
      })
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

  const handleDeleteMedia = (id: string) => {
    const updatedMedia = mediaItems.filter((item) => item.id !== id)
    setMediaItems(updatedMedia)
    localStorage.setItem("mediaItems", JSON.stringify(updatedMedia))

    // Remove from selected items if selected
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
    }

    toast({
      title: "Media deleted",
      description: "The media has been successfully deleted.",
    })
  }

  const handleBulkDelete = () => {
    if (selectedItems.length === 0) return

    const updatedMedia = mediaItems.filter((item) => !selectedItems.includes(item.id))
    setMediaItems(updatedMedia)
    localStorage.setItem("mediaItems", JSON.stringify(updatedMedia))
    setSelectedItems([])

    toast({
      title: "Media deleted",
      description: `${selectedItems.length} items have been successfully deleted.`,
    })
  }

  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id))
    } else {
      setSelectedItems([...selectedItems, id])
    }
  }

  const selectAllItems = () => {
    if (selectedItems.length === filteredMedia.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(filteredMedia.map((item) => item.id))
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Filter media items based on search query and selected type
  const filteredMedia = mediaItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = selectedType === "all" || item.type === selectedType
    return matchesSearch && matchesType
  })

  const getMediaIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5" />
      case "document":
        return <FileText className="h-5 w-5" />
      default:
        return <File className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Media Library</h2>
        <Button onClick={() => setIsUploadDialogOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Media
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Media Files</CardTitle>
          <CardDescription>Manage your images and other media files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search media..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="image">Images</SelectItem>
                    <SelectItem value="document">Documents</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    className="rounded-r-none"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    className="rounded-l-none"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {selectedItems.length > 0 && (
              <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                <span className="text-sm">{selectedItems.length} items selected</span>
                <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            )}

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Media</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-0">
                {filteredMedia.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No media files found. Upload your first media file.
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredMedia.map((item) => (
                      <div
                        key={item.id}
                        className={`relative group border rounded-md overflow-hidden ${
                          selectedItems.includes(item.id) ? "ring-2 ring-primary" : ""
                        }`}
                      >
                        <div className="absolute top-2 left-2 z-10">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item.id)}
                            onChange={() => toggleSelectItem(item.id)}
                            className="h-4 w-4"
                          />
                        </div>
                        <div className="aspect-square relative bg-muted">
                          {item.type === "image" ? (
                            <Image src={item.url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                          ) : (
                            <div className="flex items-center justify-center h-full">{getMediaIcon(item.type)}</div>
                          )}
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              variant="destructive"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleDeleteMedia(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-2">
                          <p className="text-sm font-medium truncate" title={item.name}>
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(item.size)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted">
                          <th className="p-2 text-left">
                            <input
                              type="checkbox"
                              checked={selectedItems.length === filteredMedia.length && filteredMedia.length > 0}
                              onChange={selectAllItems}
                              className="h-4 w-4"
                            />
                          </th>
                          <th className="p-2 text-left">Preview</th>
                          <th className="p-2 text-left">Name</th>
                          <th className="p-2 text-left">Type</th>
                          <th className="p-2 text-left">Size</th>
                          <th className="p-2 text-left">Uploaded</th>
                          <th className="p-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMedia.map((item) => (
                          <tr key={item.id} className="border-t">
                            <td className="p-2">
                              <input
                                type="checkbox"
                                checked={selectedItems.includes(item.id)}
                                onChange={() => toggleSelectItem(item.id)}
                                className="h-4 w-4"
                              />
                            </td>
                            <td className="p-2">
                              <div className="relative w-10 h-10 bg-muted rounded-md overflow-hidden">
                                {item.type === "image" ? (
                                  <Image
                                    src={item.url || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <div className="flex items-center justify-center h-full">
                                    {getMediaIcon(item.type)}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="p-2 font-medium">{item.name}</td>
                            <td className="p-2 capitalize">{item.type}</td>
                            <td className="p-2">{formatFileSize(item.size)}</td>
                            <td className="p-2">{formatDate(item.uploadedAt)}</td>
                            <td className="p-2">
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteMedia(item.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="images" className="mt-0">
                {filteredMedia.filter((item) => item.type === "image").length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No images found. Upload your first image.
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredMedia
                      .filter((item) => item.type === "image")
                      .map((item) => (
                        <div
                          key={item.id}
                          className={`relative group border rounded-md overflow-hidden ${
                            selectedItems.includes(item.id) ? "ring-2 ring-primary" : ""
                          }`}
                        >
                          <div className="absolute top-2 left-2 z-10">
                            <input
                              type="checkbox"
                              checked={selectedItems.includes(item.id)}
                              onChange={() => toggleSelectItem(item.id)}
                              className="h-4 w-4"
                            />
                          </div>
                          <div className="aspect-square relative bg-muted">
                            <Image src={item.url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button
                                variant="destructive"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleDeleteMedia(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="p-2">
                            <p className="text-sm font-medium truncate" title={item.name}>
                              {item.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{formatFileSize(item.size)}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="documents" className="mt-0">
                {filteredMedia.filter((item) => item.type === "document").length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No documents found. Upload your first document.
                  </div>
                ) : (
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted">
                          <th className="p-2 text-left">
                            <input
                              type="checkbox"
                              checked={
                                selectedItems.length ===
                                  filteredMedia.filter((item) => item.type === "document").length &&
                                filteredMedia.filter((item) => item.type === "document").length > 0
                              }
                              onChange={() => {
                                const documentIds = filteredMedia
                                  .filter((item) => item.type === "document")
                                  .map((item) => item.id)

                                if (documentIds.every((id) => selectedItems.includes(id))) {
                                  setSelectedItems(selectedItems.filter((id) => !documentIds.includes(id)))
                                } else {
                                  setSelectedItems([...new Set([...selectedItems, ...documentIds])])
                                }
                              }}
                              className="h-4 w-4"
                            />
                          </th>
                          <th className="p-2 text-left">Name</th>
                          <th className="p-2 text-left">Size</th>
                          <th className="p-2 text-left">Uploaded</th>
                          <th className="p-2 text-left">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMedia
                          .filter((item) => item.type === "document")
                          .map((item) => (
                            <tr key={item.id} className="border-t">
                              <td className="p-2">
                                <input
                                  type="checkbox"
                                  checked={selectedItems.includes(item.id)}
                                  onChange={() => toggleSelectItem(item.id)}
                                  className="h-4 w-4"
                                />
                              </td>
                              <td className="p-2 font-medium">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                                  {item.name}
                                </div>
                              </td>
                              <td className="p-2">{formatFileSize(item.size)}</td>
                              <td className="p-2">{formatDate(item.uploadedAt)}</td>
                              <td className="p-2">
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteMedia(item.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Media</DialogTitle>
            <DialogDescription>Add a new media file to your library.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUploadSubmit}>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="uploadUrl">Media URL *</Label>
                <Input
                  id="uploadUrl"
                  value={uploadUrl}
                  onChange={(e) => setUploadUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="uploadName">Name *</Label>
                <Input
                  id="uploadName"
                  value={uploadName}
                  onChange={(e) => setUploadName(e.target.value)}
                  placeholder="My Image"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="uploadTags">Tags (comma separated)</Label>
                <Input
                  id="uploadTags"
                  value={uploadTags}
                  onChange={(e) => setUploadTags(e.target.value)}
                  placeholder="tag1, tag2, tag3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Uploading..." : "Upload"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
