"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  Car,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
  Copy,
  TrendingUp,
  MessageSquare,
  Calendar,
  Gauge,
  Fuel,
  Settings,
} from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/store"
import { updateFilters, setSearchQuery, deleteVehicle, updateVehicleStatus } from "@/lib/slices/dealerVehiclesSlice"

export default function DealerVehiclesPage() {
  const dispatch = useAppDispatch()
  const { vehicles, filters, searchQuery, isLoading } = useAppSelector((state) => state.dealerVehicles)
  const [selectedTab, setSelectedTab] = useState("all")

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.vin.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = selectedTab === "all" || vehicle.status === selectedTab
    const matchesMake = filters.make === "all" || vehicle.make === filters.make
    const matchesCondition = filters.condition === "all" || vehicle.condition === filters.condition
    const matchesPrice = vehicle.price >= filters.priceRange[0] && vehicle.price <= filters.priceRange[1]

    return matchesSearch && matchesStatus && matchesMake && matchesCondition && matchesPrice
  })

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

  const getStatusCounts = () => {
    return {
      all: vehicles.length,
      live: vehicles.filter((v) => v.status === "live").length,
      pending: vehicles.filter((v) => v.status === "pending").length,
      draft: vehicles.filter((v) => v.status === "draft").length,
      sold: vehicles.filter((v) => v.status === "sold").length,
    }
  }

  const statusCounts = getStatusCounts()

  const handleDeleteVehicle = (vehicleId: string) => {
    dispatch(deleteVehicle(vehicleId))
  }

  const handleStatusChange = (vehicleId: string, newStatus: any) => {
    dispatch(updateVehicleStatus({ id: vehicleId, status: newStatus }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Vehicles</h1>
          <p className="text-muted-foreground">Manage your vehicle inventory and listings</p>
        </div>
        <Link href="/dealer/vehicles/add">
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Vehicle</span>
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicles.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Live Listings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.live}</div>
            <p className="text-xs text-muted-foreground">Active on platform</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicles.reduce((sum, v) => sum + v.views, 0)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicles.reduce((sum, v) => sum + v.leads, 0)}</div>
            <p className="text-xs text-muted-foreground">Pending responses</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="pl-10 w-64"
            />
          </div>

          <Select value={filters.make} onValueChange={(value) => dispatch(updateFilters({ make: value }))}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Make" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Makes</SelectItem>
              <SelectItem value="BMW">BMW</SelectItem>
              <SelectItem value="Tesla">Tesla</SelectItem>
              <SelectItem value="Mercedes">Mercedes</SelectItem>
              <SelectItem value="Audi">Audi</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.condition} onValueChange={(value) => dispatch(updateFilters({ condition: value }))}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Conditions</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="used">Used</SelectItem>
              <SelectItem value="certified">Certified</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
          <Filter className="h-4 w-4" />
          <span>More Filters</span>
        </Button>
      </div>

      {/* Vehicle Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
          <TabsTrigger value="live">Live ({statusCounts.live})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({statusCounts.pending})</TabsTrigger>
          <TabsTrigger value="draft">Draft ({statusCounts.draft})</TabsTrigger>
          <TabsTrigger value="sold">Sold ({statusCounts.sold})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredVehicles.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Car className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No vehicles found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  {searchQuery ? "Try adjusting your search criteria" : "Start by adding your first vehicle"}
                </p>
                <Link href="/dealer/vehicles/add">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Vehicle
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={vehicle.photos[0] || "/placeholder.svg?height=200&width=300&query=car"}
                      alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className={`absolute top-2 right-2 ${getStatusColor(vehicle.status)}`}>
                      {vehicle.status}
                    </Badge>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </CardTitle>
                        <CardDescription className="flex items-center space-x-4 mt-1">
                          <span className="flex items-center space-x-1">
                            <Gauge className="h-3 w-3" />
                            <span>{vehicle.mileage.toLocaleString()} miles</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Fuel className="h-3 w-3" />
                            <span>{vehicle.fuelType}</span>
                          </span>
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/dealer/vehicles/${vehicle.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dealer/vehicles/${vehicle.id}/edit`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(vehicle.id, vehicle.status === "live" ? "archived" : "live")
                            }
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            {vehicle.status === "live" ? "Archive" : "Publish"}
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Vehicle</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this vehicle? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteVehicle(vehicle.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">${vehicle.price.toLocaleString()}</span>
                        <Badge variant="outline">{vehicle.condition}</Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{vehicle.views} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{vehicle.leads} leads</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(vehicle.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Link href={`/dealer/vehicles/${vehicle.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </Link>
                        <Link href={`/dealer/vehicles/${vehicle.id}/edit`} className="flex-1">
                          <Button size="sm" className="w-full">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
