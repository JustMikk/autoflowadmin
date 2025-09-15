"use client"

import { useState } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/store"
import { setSearchTerm, setStatusFilter, setMakeFilter, updateVehicleStatus } from "@/lib/slices/vehiclesSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Search,
  MoreHorizontal,
  Car,
  Eye,
  CheckCircle,
  XCircle,
  Pause,
  Calendar,
  Gauge,
  DollarSign,
  Building2,
} from "lucide-react"
import type { Vehicle } from "@/lib/slices/vehiclesSlice"

export default function VehiclesPage() {
  const dispatch = useAppDispatch()
  const { vehicles, searchTerm, statusFilter, makeFilter } = useAppSelector((state) => state.vehicles)
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [actionDialogOpen, setActionDialogOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<{ vehicleId: string; action: Vehicle["status"] } | null>(null)

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.dealerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter
    const matchesMake = makeFilter === "all" || vehicle.make === makeFilter
    return matchesSearch && matchesStatus && matchesMake
  })

  const handleStatusChange = (vehicleId: string, status: Vehicle["status"]) => {
    setPendingAction({ vehicleId, action: status })
    setActionDialogOpen(true)
  }

  const confirmAction = () => {
    if (pendingAction) {
      dispatch(updateVehicleStatus({ id: pendingAction.vehicleId, status: pendingAction.action }))
      setPendingAction(null)
    }
    setActionDialogOpen(false)
  }

  const handleViewDetails = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle)
    setDetailsOpen(true)
  }

  const getStatusBadge = (status: Vehicle["status"]) => {
    const variants = {
      active: "bg-primary/10 text-primary border-primary/20",
      pending: "bg-secondary/10 text-secondary-foreground border-secondary/20",
      sold: "bg-blue-100 text-blue-800 border-blue-200",
      rejected: "bg-destructive/10 text-destructive border-destructive/20",
    }
    return variants[status]
  }

  const getConditionBadge = (condition: Vehicle["condition"]) => {
    const variants = {
      new: "bg-green-100 text-green-800 border-green-200",
      used: "bg-yellow-100 text-yellow-800 border-yellow-200",
      certified: "bg-purple-100 text-purple-800 border-purple-200",
    }
    return variants[condition]
  }

  const uniqueMakes = Array.from(new Set(vehicles.map((v) => v.make))).sort()

  const getActionText = (action: Vehicle["status"]) => {
    switch (action) {
      case "active":
        return "approve"
      case "rejected":
        return "reject"
      case "sold":
        return "mark as sold"
      default:
        return "update"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Vehicle Management</h1>
          <p className="text-muted-foreground">Manage and monitor all vehicle listings</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">{filteredVehicles.length} vehicles</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              {filteredVehicles.filter((v) => v.status === "active").length} active
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Pause className="h-4 w-4 text-secondary" />
            <span className="text-sm text-muted-foreground">
              {filteredVehicles.filter((v) => v.status === "pending").length} pending
            </span>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vehicle Listings</CardTitle>
          <CardDescription>View and manage all vehicle listings on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by make, model, VIN, or dealer..."
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={(value) => dispatch(setStatusFilter(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={makeFilter} onValueChange={(value) => dispatch(setMakeFilter(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Makes</SelectItem>
                {uniqueMakes.map((make) => (
                  <SelectItem key={make} value={make}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Dealer</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Mileage</TableHead>
                  <TableHead>Listed</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </div>
                        <div className="text-sm text-muted-foreground">VIN: {vehicle.vin}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{vehicle.dealerName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{vehicle.price.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getConditionBadge(vehicle.condition)}>
                        {vehicle.condition}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadge(vehicle.status)}>
                        {vehicle.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Gauge className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{vehicle.mileage.toLocaleString()} mi</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{new Date(vehicle.createdAt).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewDetails(vehicle)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {vehicle.status === "pending" && (
                            <>
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(vehicle.id, "active")}
                                className="text-primary"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve Listing
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(vehicle.id, "rejected")}
                                className="text-destructive"
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject Listing
                              </DropdownMenuItem>
                            </>
                          )}
                          {vehicle.status === "active" && (
                            <>
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(vehicle.id, "pending")}
                                className="text-secondary-foreground"
                              >
                                <Pause className="mr-2 h-4 w-4" />
                                Mark as Pending
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(vehicle.id, "sold")}
                                className="text-blue-600"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark as Sold
                              </DropdownMenuItem>
                            </>
                          )}
                          {vehicle.status === "rejected" && (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(vehicle.id, "pending")}
                              className="text-primary"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Reactivate Listing
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-8">
              <Car className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold text-foreground">No vehicles found</h3>
              <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Vehicle Details</DialogTitle>
            <DialogDescription>
              Comprehensive information about {selectedVehicle?.year} {selectedVehicle?.make} {selectedVehicle?.model}
            </DialogDescription>
          </DialogHeader>
          {selectedVehicle && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">Vehicle Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Make:</span>
                        <span className="text-sm font-medium">{selectedVehicle.make}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Model:</span>
                        <span className="text-sm font-medium">{selectedVehicle.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Year:</span>
                        <span className="text-sm font-medium">{selectedVehicle.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">VIN:</span>
                        <span className="text-sm font-medium font-mono">{selectedVehicle.vin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Condition:</span>
                        <Badge variant="outline" className={getConditionBadge(selectedVehicle.condition)}>
                          {selectedVehicle.condition}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">Dealer Information</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Dealer:</span>
                        <span className="text-sm font-medium">{selectedVehicle.dealerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Dealer ID:</span>
                        <span className="text-sm font-medium">{selectedVehicle.dealerId}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">Pricing & Status</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Price:</span>
                        <span className="text-lg font-bold text-primary">
                          ${selectedVehicle.price.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Mileage:</span>
                        <span className="text-sm font-medium">{selectedVehicle.mileage.toLocaleString()} miles</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <Badge variant="outline" className={getStatusBadge(selectedVehicle.status)}>
                          {selectedVehicle.status}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">Listing History</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Listed:</span>
                        <span className="text-sm font-medium">
                          {new Date(selectedVehicle.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center justify-center">
                    <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Car className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Vehicle images would appear here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Action</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {pendingAction ? getActionText(pendingAction.action) : ""} this vehicle listing?
              This action will update the vehicle status and notify the dealer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction} className="bg-primary text-primary-foreground">
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
