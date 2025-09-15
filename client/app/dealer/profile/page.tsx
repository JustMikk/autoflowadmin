"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Building,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Camera,
  Star,
  Eye,
  Save,
  Upload,
  X,
  Plus,
  Edit,
} from "lucide-react"
import { useAppSelector } from "@/lib/store"

export default function DealerProfilePage() {
  const { user } = useAppSelector((state) => state.dealerAuth)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    companyName: user?.companyName || "",
    description:
      "Premium Auto Sales has been serving the community for over 15 years with quality pre-owned vehicles and exceptional customer service.",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    phone: user?.phone || "",
    email: user?.email || "",
    website: "https://www.premiumautosales.com",
    specialties: ["Luxury Cars", "SUVs", "Electric Vehicles"],
    businessHours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "09:00", close: "17:00", closed: false },
      sunday: { open: "10:00", close: "16:00", closed: true },
    },
    photos: ["/car-dealership-exterior.jpg", "/car-showroom-interior.png", "/service-department.jpg"],
    services: [
      "Vehicle Sales",
      "Trade-In Evaluations",
      "Financing Assistance",
      "Extended Warranties",
      "Vehicle Inspections",
    ],
  })

  const updateProfileData = (field: string, value: any) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const updateBusinessHours = (day: string, field: string, value: any) => {
    setProfileData((prev) => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day as keyof typeof prev.businessHours],
          [field]: value,
        },
      },
    }))
  }

  const addSpecialty = (specialty: string) => {
    if (!profileData.specialties.includes(specialty)) {
      updateProfileData("specialties", [...profileData.specialties, specialty])
    }
  }

  const removeSpecialty = (specialty: string) => {
    updateProfileData(
      "specialties",
      profileData.specialties.filter((s) => s !== specialty),
    )
  }

  const handleSave = () => {
    // Save profile data
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Company Profile</h1>
          <p className="text-muted-foreground">Manage your dealership's public profile and business information</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
            <Eye className="h-4 w-4" />
            <span>Preview Public Profile</span>
          </Button>
          {isEditing ? (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="flex items-center space-x-2">
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="hours">Business Hours</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        {/* Basic Information */}
        <TabsContent value="basic" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <span>Company Information</span>
                </CardTitle>
                <CardDescription>Basic details about your dealership</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={profileData.companyName}
                    onChange={(e) => updateProfileData("companyName", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={profileData.description}
                    onChange={(e) => updateProfileData("description", e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Specialties</Label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="flex items-center space-x-1">
                        <span>{specialty}</span>
                        {isEditing && (
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeSpecialty(specialty)} />
                        )}
                      </Badge>
                    ))}
                    {isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newSpecialty = prompt("Enter specialty:")
                          if (newSpecialty) addSpecialty(newSpecialty)
                        }}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Contact Information</span>
                </CardTitle>
                <CardDescription>How customers can reach you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) => updateProfileData("address", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => updateProfileData("city", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={profileData.state}
                      onChange={(e) => updateProfileData("state", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={profileData.zipCode}
                    onChange={(e) => updateProfileData("zipCode", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => updateProfileData("phone", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={profileData.email}
                    onChange={(e) => updateProfileData("email", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => updateProfileData("website", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Business Hours */}
        <TabsContent value="hours" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Business Hours</span>
              </CardTitle>
              <CardDescription>Set your operating hours for each day of the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(profileData.businessHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="w-24">
                      <Label className="capitalize font-medium">{day}</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={!hours.closed}
                        onCheckedChange={(checked) => updateBusinessHours(day, "closed", !checked)}
                        disabled={!isEditing}
                      />
                      <span className="text-sm text-muted-foreground">{hours.closed ? "Closed" : "Open"}</span>
                    </div>

                    {!hours.closed && (
                      <div className="flex items-center space-x-2">
                        <Input
                          type="time"
                          value={hours.open}
                          onChange={(e) => updateBusinessHours(day, "open", e.target.value)}
                          disabled={!isEditing}
                          className="w-32"
                        />
                        <span className="text-muted-foreground">to</span>
                        <Input
                          type="time"
                          value={hours.close}
                          onChange={(e) => updateBusinessHours(day, "close", e.target.value)}
                          disabled={!isEditing}
                          className="w-32"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Photos */}
        <TabsContent value="photos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="h-5 w-5" />
                <span>Dealership Photos</span>
              </CardTitle>
              <CardDescription>Showcase your dealership with high-quality photos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {profileData.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo || "/placeholder.svg"}
                      alt={`Dealership photo ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg border"
                    />
                    {isEditing && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button variant="destructive" size="sm">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                {isEditing && (
                  <div className="border-2 border-dashed border-border rounded-lg h-48 flex items-center justify-center">
                    <Button variant="outline" className="flex flex-col items-center space-y-2 bg-transparent">
                      <Upload className="h-6 w-6" />
                      <span>Add Photo</span>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services */}
        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Services Offered</CardTitle>
              <CardDescription>List the services your dealership provides</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profileData.services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span>{service}</span>
                    {isEditing && (
                      <Button variant="ghost" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}

                {isEditing && (
                  <Button variant="outline" className="w-full bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preview */}
        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Public Profile Preview</CardTitle>
              <CardDescription>This is how your profile appears to customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      <Building className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{profileData.companyName}</h2>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {profileData.city}, {profileData.state}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>4.8 (127 reviews)</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {profileData.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold mb-2">About Us</h3>
                  <p className="text-muted-foreground">{profileData.description}</p>
                </div>

                {/* Contact Info */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {profileData.address}, {profileData.city}, {profileData.state} {profileData.zipCode}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{profileData.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{profileData.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>{profileData.website}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Business Hours</h3>
                    <div className="space-y-1 text-sm">
                      {Object.entries(profileData.businessHours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                          <span className="capitalize">{day}</span>
                          <span className="text-muted-foreground">
                            {hours.closed ? "Closed" : `${hours.open} - ${hours.close}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
