"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Car, Upload, X, Plus, Save, Eye, ArrowLeft, Camera, FileText, Settings, DollarSign } from "lucide-react"
import { useAppDispatch } from "@/lib/store"
import { addVehicle } from "@/lib/slices/dealerVehiclesSlice"

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

export default function AddVehiclePage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [currentTab, setCurrentTab] = useState("basic")
  const [vehicleData, setVehicleData] = useState({
    // Basic Information
    make: "",
    model: "",
    year: new Date().getFullYear(),
    condition: "used",
    bodyType: "",
    doors: 4,
    seats: 5,

    // Engine & Performance
    fuelType: "",
    transmission: "",
    drivetrain: "",
    engineSize: "",
    mpgCity: 0,
    mpgHighway: 0,
    acceleration: "",
    co2Emissions: 0,

    // Exterior & Interior
    exteriorColor: "",
    interiorColor: "",

    // Pricing & Details
    price: 0,
    mileage: 0,
    vin: "",
    location: "New York, NY",

    // Description & Features
    description: "",
    features: [] as string[],

    // Additional Details
    taxPerYear: 0,
    insuranceGroup: "",
    bootSpace: 0,
    previouslyWrittenOff: false,
    manufacturerApproved: false,

    // Photos
    photos: [] as string[],

    // Status
    status: "draft" as const,
  })

  const updateVehicleData = (field: string, value: any) => {
    setVehicleData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleFeature = (feature: string) => {
    setVehicleData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
  }

  const addPhoto = () => {
    // Simulate photo upload
    const newPhoto = `/placeholder.svg?height=300&width=400&query=car-${Date.now()}`
    setVehicleData((prev) => ({
      ...prev,
      photos: [...prev.photos, newPhoto],
    }))
  }

  const removePhoto = (index: number) => {
    setVehicleData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }))
  }

  const getCompletionPercentage = () => {
    const requiredFields = [
      "make",
      "model",
      "year",
      "condition",
      "bodyType",
      "fuelType",
      "transmission",
      "price",
      "mileage",
      "exteriorColor",
      "description",
    ]
    const completedFields = requiredFields.filter((field) => {
      const value = vehicleData[field as keyof typeof vehicleData]
      return value !== "" && value !== 0
    })
    return Math.round((completedFields.length / requiredFields.length) * 100)
  }

  const canSave = () => {
    return vehicleData.make && vehicleData.model && vehicleData.price > 0
  }

  const handleSave = (status: "draft" | "pending") => {
    const vehicleToSave = {
      ...vehicleData,
      status,
      location: vehicleData.location || "New York, NY",
    }

    dispatch(addVehicle(vehicleToSave))
    router.push("/dealer/vehicles")
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
            <h1 className="text-3xl font-bold text-foreground">Add New Vehicle</h1>
            <p className="text-muted-foreground">Create a new vehicle listing for your inventory</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Completion</div>
            <div className="flex items-center space-x-2">
              <Progress value={getCompletionPercentage()} className="w-20" />
              <span className="text-sm font-medium">{getCompletionPercentage()}%</span>
            </div>
          </div>
          <Button variant="outline" onClick={() => handleSave("draft")} disabled={!canSave()}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => handleSave("pending")} disabled={!canSave()}>
            <Eye className="h-4 w-4 mr-2" />
            Submit for Review
          </Button>
        </div>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic" className="flex items-center space-x-2">
            <Car className="h-4 w-4" />
            <span>Basic Info</span>
          </TabsTrigger>
          <TabsTrigger value="specs" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Specifications</span>
          </TabsTrigger>
          <TabsTrigger value="pricing" className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4" />
            <span>Pricing</span>
          </TabsTrigger>
          <TabsTrigger value="details" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Details</span>
          </TabsTrigger>
          <TabsTrigger value="photos" className="flex items-center space-x-2">
            <Camera className="h-4 w-4" />
            <span>Photos</span>
          </TabsTrigger>
        </TabsList>

        {/* Basic Information */}
        <TabsContent value="basic" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Information</CardTitle>
                <CardDescription>Basic details about the vehicle</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="make">Make *</Label>
                    <Select value={vehicleData.make} onValueChange={(value) => updateVehicleData("make", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select make" />
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
                    <Label htmlFor="model">Model *</Label>
                    <Input
                      id="model"
                      placeholder="e.g., X5, Model S"
                      value={vehicleData.model}
                      onChange={(e) => updateVehicleData("model", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year *</Label>
                    <Input
                      id="year"
                      type="number"
                      min="1990"
                      max={new Date().getFullYear() + 1}
                      value={vehicleData.year}
                      onChange={(e) => updateVehicleData("year", Number.parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition *</Label>
                    <Select
                      value={vehicleData.condition}
                      onValueChange={(value) => updateVehicleData("condition", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="used">Used</SelectItem>
                        <SelectItem value="certified">Certified Pre-Owned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bodyType">Body Type *</Label>
                  <Select value={vehicleData.bodyType} onValueChange={(value) => updateVehicleData("bodyType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select body type" />
                    </SelectTrigger>
                    <SelectContent>
                      {BODY_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="doors">Doors</Label>
                    <Select
                      value={vehicleData.doors.toString()}
                      onValueChange={(value) => updateVehicleData("doors", Number.parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 doors</SelectItem>
                        <SelectItem value="3">3 doors</SelectItem>
                        <SelectItem value="4">4 doors</SelectItem>
                        <SelectItem value="5">5 doors</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seats">Seats</Label>
                    <Select
                      value={vehicleData.seats.toString()}
                      onValueChange={(value) => updateVehicleData("seats", Number.parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 seats</SelectItem>
                        <SelectItem value="4">4 seats</SelectItem>
                        <SelectItem value="5">5 seats</SelectItem>
                        <SelectItem value="7">7 seats</SelectItem>
                        <SelectItem value="8">8 seats</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Colors</CardTitle>
                <CardDescription>Exterior and interior colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="exteriorColor">Exterior Color *</Label>
                  <Input
                    id="exteriorColor"
                    placeholder="e.g., Alpine White, Jet Black"
                    value={vehicleData.exteriorColor}
                    onChange={(e) => updateVehicleData("exteriorColor", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interiorColor">Interior Color</Label>
                  <Input
                    id="interiorColor"
                    placeholder="e.g., Black Leather, Beige Cloth"
                    value={vehicleData.interiorColor}
                    onChange={(e) => updateVehicleData("interiorColor", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Specifications */}
        <TabsContent value="specs" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Engine & Performance</CardTitle>
                <CardDescription>Technical specifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fuelType">Fuel Type *</Label>
                  <Select value={vehicleData.fuelType} onValueChange={(value) => updateVehicleData("fuelType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fuel type" />
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
                  <Label htmlFor="transmission">Transmission *</Label>
                  <Select
                    value={vehicleData.transmission}
                    onValueChange={(value) => updateVehicleData("transmission", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select transmission" />
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

                <div className="space-y-2">
                  <Label htmlFor="drivetrain">Drivetrain</Label>
                  <Select
                    value={vehicleData.drivetrain}
                    onValueChange={(value) => updateVehicleData("drivetrain", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select drivetrain" />
                    </SelectTrigger>
                    <SelectContent>
                      {DRIVETRAINS.map((drive) => (
                        <SelectItem key={drive} value={drive}>
                          {drive}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="engineSize">Engine Size</Label>
                  <Input
                    id="engineSize"
                    placeholder="e.g., 2.0L, 3.0L, Electric"
                    value={vehicleData.engineSize}
                    onChange={(e) => updateVehicleData("engineSize", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Efficiency & Performance</CardTitle>
                <CardDescription>Fuel economy and performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="mpgCity">City MPG</Label>
                    <Input
                      id="mpgCity"
                      type="number"
                      placeholder="25"
                      value={vehicleData.mpgCity || ""}
                      onChange={(e) => updateVehicleData("mpgCity", Number.parseInt(e.target.value) || 0)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mpgHighway">Highway MPG</Label>
                    <Input
                      id="mpgHighway"
                      type="number"
                      placeholder="32"
                      value={vehicleData.mpgHighway || ""}
                      onChange={(e) => updateVehicleData("mpgHighway", Number.parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="acceleration">0-60 mph</Label>
                  <Input
                    id="acceleration"
                    placeholder="e.g., 6.1s"
                    value={vehicleData.acceleration}
                    onChange={(e) => updateVehicleData("acceleration", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="co2Emissions">CO2 Emissions (g/km)</Label>
                  <Input
                    id="co2Emissions"
                    type="number"
                    placeholder="185"
                    value={vehicleData.co2Emissions || ""}
                    onChange={(e) => updateVehicleData("co2Emissions", Number.parseInt(e.target.value) || 0)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Pricing */}
        <TabsContent value="pricing" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pricing Information</CardTitle>
                <CardDescription>Set your vehicle's price and details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="price"
                      type="number"
                      placeholder="65000"
                      value={vehicleData.price || ""}
                      onChange={(e) => updateVehicleData("price", Number.parseInt(e.target.value) || 0)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mileage">Mileage *</Label>
                  <Input
                    id="mileage"
                    type="number"
                    placeholder="12500"
                    value={vehicleData.mileage || ""}
                    onChange={(e) => updateVehicleData("mileage", Number.parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vin">VIN</Label>
                  <Input
                    id="vin"
                    placeholder="WBAJA7C50PCG12345"
                    value={vehicleData.vin}
                    onChange={(e) => updateVehicleData("vin", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="New York, NY"
                    value={vehicleData.location}
                    onChange={(e) => updateVehicleData("location", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Costs</CardTitle>
                <CardDescription>Tax and insurance information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="taxPerYear">Tax per Year ($)</Label>
                  <Input
                    id="taxPerYear"
                    type="number"
                    placeholder="580"
                    value={vehicleData.taxPerYear || ""}
                    onChange={(e) => updateVehicleData("taxPerYear", Number.parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceGroup">Insurance Group</Label>
                  <Input
                    id="insuranceGroup"
                    placeholder="e.g., 45E"
                    value={vehicleData.insuranceGroup}
                    onChange={(e) => updateVehicleData("insuranceGroup", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bootSpace">Boot Space (L)</Label>
                  <Input
                    id="bootSpace"
                    type="number"
                    placeholder="650"
                    value={vehicleData.bootSpace || ""}
                    onChange={(e) => updateVehicleData("bootSpace", Number.parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="previouslyWrittenOff"
                      checked={vehicleData.previouslyWrittenOff}
                      onCheckedChange={(checked) => updateVehicleData("previouslyWrittenOff", checked)}
                    />
                    <Label htmlFor="previouslyWrittenOff">Previously written off</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="manufacturerApproved"
                      checked={vehicleData.manufacturerApproved}
                      onCheckedChange={(checked) => updateVehicleData("manufacturerApproved", checked)}
                    />
                    <Label htmlFor="manufacturerApproved">Manufacturer approved</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Details */}
        <TabsContent value="details" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
                <CardDescription>Provide a detailed description of the vehicle</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe the vehicle's condition, history, special features, and any other relevant details..."
                  value={vehicleData.description}
                  onChange={(e) => updateVehicleData("description", e.target.value)}
                  rows={6}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features & Equipment</CardTitle>
                <CardDescription>Select all features that apply to this vehicle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {STANDARD_FEATURES.map((feature) => (
                    <div
                      key={feature}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        vehicleData.features.includes(feature)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => toggleFeature(feature)}
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox checked={vehicleData.features.includes(feature)} readOnly />
                        <span className="text-sm">{feature}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {vehicleData.features.length > 0 && (
                  <div className="mt-4">
                    <Label className="text-sm font-medium">Selected Features:</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {vehicleData.features.map((feature) => (
                        <Badge key={feature} variant="secondary" className="flex items-center space-x-1">
                          <span>{feature}</span>
                          <X className="h-3 w-3 cursor-pointer" onClick={() => toggleFeature(feature)} />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Photos */}
        <TabsContent value="photos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Photos</CardTitle>
              <CardDescription>
                Add high-quality photos of your vehicle. The first photo will be used as the main image.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {vehicleData.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo || "/placeholder.svg"}
                      alt={`Vehicle photo ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button variant="destructive" size="sm" onClick={() => removePhoto(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    {index === 0 && <Badge className="absolute top-2 left-2 bg-primary">Main Photo</Badge>}
                  </div>
                ))}

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
              </div>

              {vehicleData.photos.length === 0 && (
                <div className="text-center py-8">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No photos added yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Add photos to make your listing more attractive to buyers
                  </p>
                  <Button onClick={addPhoto}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Photo
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
