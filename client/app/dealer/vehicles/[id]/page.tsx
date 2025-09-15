"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  ArrowLeft,
  Edit,
  Save,
  X,
  Eye,
  MessageSquare,
  Calendar,
  MapPin,
  Fuel,
  Settings,
  Car,
  DollarSign,
  Share2,
  Copy,
  Trash2,
  ExternalLink,
  Camera,
  Plus,
  Upload,
} from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/store"
import { updateVehicle, deleteVehicle, updateVehicleStatus } from "@/lib/slices/dealerVehiclesSlice"

const MAKES = ["BMW", "Mercedes", "Audi", "Tesla", "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Hyundai"]
const BODY_TYPES = ["Sedan", "SUV", "Hatchback", "Coupe", "Convertible", "Wagon", "Truck", "Van"]
const FUEL_TYPES = ["Petrol", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid"]
const TRANSMISSIONS = ["Manual", "Automatic", "CVT", "Semi-Automatic"]
const DRIVETRAINS = ["FWD", "RWD", "AWD", "4WD"]

const STANDARD_FEATURES = [
  "Air Conditioning",
  "Power Steering",
  "Electric Windows",
  "Central Locking",
  "ABS",
  "Airbags",
  "Alloy Wheels",
  "Bluetooth",
  "USB Connectivity",
  "Cruise Control",
  "Parking Sensors",
  "Reversing Camera",
  "Navigation System",
  "Heated Seats",
  "Leather Seats",
  "Sunroof",
  "Premium Audio",
  "Keyless Entry",
  "Start/Stop Button",
]

export default function VehicleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { vehicles } = useAppSelector((state) => state.dealerVehicles)

  const vehicleId = params.id as string
  const vehicle = vehicles.find((v) => v.id === vehicleId)

  const [isEditing, setIsEditing] = useState(false)
  const [editedVehicle, setEditedVehicle] = useState(vehicle || null)

  if (!vehicle || !editedVehicle) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Vehicle not found</h3>
          <p className="text-muted-foreground mb-4">The vehicle you're looking for doesn't exist.</p>
          <Link href="/dealer/vehicles">
            <Button>Back to Vehicles</Button>
          </Link>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "sold":
        return "bg-blue-100 text-blue-800"
      case "archived":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const updateField = (field: string, value: any) => {
    setEditedVehicle((prev) => (prev ? { ...prev, [field]: value } : null))
  }

  const toggleFeature = (feature: string) => {
    if (!editedVehicle) return
    setEditedVehicle((prev) =>
      prev
        ? {
            ...prev,
            features: prev.features.includes(feature)
              ? prev.features.filter((f) => f !== feature)
              : [...prev.features, feature],
          }
        : null,
    )
  }

  const handleSave = () => {
    if (!editedVehicle) return
    dispatch(updateVehicle({ id: vehicleId, updates: editedVehicle }))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedVehicle(vehicle)
    setIsEditing(false)
  }

  const handleDelete = () => {
    dispatch(deleteVehicle(vehicleId))
    router.push("/dealer/vehicles")
  }

  const handleStatusChange = (newStatus: any) => {
    dispatch(updateVehicleStatus({ id: vehicleId, status: newStatus }))
  }

  const addPhoto = () => {
    if (!editedVehicle) return
    const newPhoto = `/placeholder.svg?height=300&width=400&query=car-${Date.now()}`
    setEditedVehicle((prev) =>
      prev
        ? {
            ...prev,
            photos: [...prev.photos, newPhoto],
          }
        : null,
    )
  }

  const removePhoto = (index: number) => {
    if (!editedVehicle) return
    setEditedVehicle((prev) =>
      prev
        ? {
            ...prev,
            photos: prev.photos.filter((_, i) => i !== index),
          }
        : null,
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold text-foreground">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
            </div>
            <p className="text-muted-foreground">VIN: {vehicle.vin || "Not specified"}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {!isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/vehicles/${vehicleId}`} target="_blank">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Live
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${vehicle.price.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Listed price</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicle.views}</div>
            <p className="text-xs text-muted-foreground">Total views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicle.leads}</div>
            <p className="text-xs text-muted-foreground">Active inquiries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Listed</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.floor((Date.now() - new Date(vehicle.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
            </div>
            <p className="text-xs text-muted-foreground">Since {new Date(vehicle.createdAt).toLocaleDateString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Photos */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Photos</CardTitle>
              <CardDescription>{isEditing ? "Add or remove vehicle photos" : "Vehicle gallery"}</CardDescription>
            </CardHeader>
            <CardContent>
              {editedVehicle.photos.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {editedVehicle.photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo || "/placeholder.svg?height=300&width=400&query=car"}
                        alt={`${vehicle.make} ${vehicle.model} - Photo ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                      {index === 0 && <Badge className="absolute top-2 left-2 bg-primary">Main Photo</Badge>}
                      {isEditing && (
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button variant="destructive" size="sm" onClick={() => removePhoto(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}

                  {isEditing && (
                    <div className="border-2 border-dashed border-border rounded-lg h-48 flex items-center justify-center">
                      <Button
                        variant="outline"
                        onClick={addPhoto}
                        className="flex flex-col items-center space-y-2 bg-transparent"
                      >
                        <Upload className="h-6 w-6" />
                        <span>Add Photo</span>
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No photos</h3>
                  <p className="text-muted-foreground mb-4">Add photos to make this listing more attractive</p>
                  {isEditing && (
                    <Button onClick={addPhoto}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Photo
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Select value={vehicle.status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="live">Live</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href={`/dealer/leads?vehicle=${vehicleId}`}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View Leads ({vehicle.leads})
                </Link>
              </Button>

              <Button variant="outline" className="w-full bg-transparent">
                <Copy className="h-4 w-4 mr-2" />
                Duplicate Listing
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Vehicle
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Vehicle</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this vehicle? This action cannot be undone and will remove all
                      associated data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Views this week</span>
                <span className="font-medium">+{Math.floor(vehicle.views * 0.3)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Leads this week</span>
                <span className="font-medium">+{Math.floor(vehicle.leads * 0.4)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Conversion rate</span>
                <span className="font-medium">{((vehicle.leads / Math.max(vehicle.views, 1)) * 100).toFixed(1)}%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Vehicle Details Tabs */}
      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Vehicle Details</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="description">Description</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Make</Label>
                        <Select value={editedVehicle.make} onValueChange={(value) => updateField("make", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {MAKES.map((make) => (
                              <SelectItem key={make} value={make}>
                                {make}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Model</Label>
                        <Input value={editedVehicle.model} onChange={(e) => updateField("model", e.target.value)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Year</Label>
                        <Input
                          type="number"
                          value={editedVehicle.year}
                          onChange={(e) => updateField("year", Number.parseInt(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Price</Label>
                        <Input
                          type="number"
                          value={editedVehicle.price}
                          onChange={(e) => updateField("price", Number.parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Make</Label>
                      <p className="font-medium">{vehicle.make}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Model</Label>
                      <p className="font-medium">{vehicle.model}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Year</Label>
                      <p className="font-medium">{vehicle.year}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Price</Label>
                      <p className="font-medium">${vehicle.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Condition</Label>
                      <Badge variant="outline" className="capitalize">
                        {vehicle.condition}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Mileage</Label>
                      <p className="font-medium">{vehicle.mileage.toLocaleString()} miles</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location & Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input value={editedVehicle.location} onChange={(e) => updateField("location", e.target.value)} />
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{vehicle.location}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="specifications" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Engine & Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label>Fuel Type</Label>
                      <Select value={editedVehicle.fuelType} onValueChange={(value) => updateField("fuelType", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {FUEL_TYPES.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Transmission</Label>
                      <Select
                        value={editedVehicle.transmission}
                        onValueChange={(value) => updateField("transmission", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {TRANSMISSIONS.map((trans) => (
                            <SelectItem key={trans} value={trans}>
                              {trans}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Fuel Type</Label>
                      <div className="flex items-center space-x-2">
                        <Fuel className="h-4 w-4" />
                        <span>{vehicle.fuelType}</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Transmission</Label>
                      <div className="flex items-center space-x-2">
                        <Settings className="h-4 w-4" />
                        <span>{vehicle.transmission}</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Engine Size</Label>
                      <p className="font-medium">{vehicle.engineSize || "Not specified"}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Drivetrain</Label>
                      <p className="font-medium">{vehicle.drivetrain || "Not specified"}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exterior & Interior</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label>Exterior Color</Label>
                      <Input
                        value={editedVehicle.exteriorColor}
                        onChange={(e) => updateField("exteriorColor", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Interior Color</Label>
                      <Input
                        value={editedVehicle.interiorColor}
                        onChange={(e) => updateField("interiorColor", e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Exterior Color</Label>
                      <p className="font-medium">{vehicle.exteriorColor}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Interior Color</Label>
                      <p className="font-medium">{vehicle.interiorColor}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Doors</Label>
                      <p className="font-medium">{vehicle.doors} doors</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Seats</Label>
                      <p className="font-medium">{vehicle.seats} seats</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Features & Equipment</CardTitle>
              <CardDescription>
                {isEditing ? "Select features that apply to this vehicle" : "Available features"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {STANDARD_FEATURES.map((feature) => (
                    <div
                      key={feature}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        editedVehicle.features.includes(feature)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => toggleFeature(feature)}
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox checked={editedVehicle.features.includes(feature)} readOnly />
                        <span className="text-sm">{feature}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {vehicle.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="description" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Description</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={editedVehicle.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  rows={8}
                  placeholder="Describe the vehicle's condition, history, special features, and any other relevant details..."
                />
              ) : (
                <div className="prose max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {vehicle.description || "No description provided."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
