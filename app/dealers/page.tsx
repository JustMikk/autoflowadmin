"use client"

import { useState } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/store"
import { setSearchTerm, setStatusFilter, setPlanFilter, updateDealerStatus } from "@/lib/slices/dealersSlice"
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
import { Search, MoreHorizontal, Building2, Star, MapPin, Eye, CheckCircle, XCircle, Pause } from "lucide-react"
import type { Dealer } from "@/lib/slices/dealersSlice"

export default function DealersPage() {
  const dispatch = useAppDispatch()
  const { dealers, searchTerm, statusFilter, planFilter } = useAppSelector((state) => state.dealers)
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const filteredDealers = dealers.filter((dealer) => {
    const matchesSearch =
      dealer.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || dealer.status === statusFilter
    const matchesPlan = planFilter === "all" || dealer.subscriptionPlan === planFilter
    return matchesSearch && matchesStatus && matchesPlan
  })

  const handleStatusChange = (dealerId: string, status: Dealer["status"]) => {
    dispatch(updateDealerStatus({ id: dealerId, status }))
  }

  const handleViewDetails = (dealer: Dealer) => {
    setSelectedDealer(dealer)
    setDetailsOpen(true)
  }

  const getStatusBadge = (status: Dealer["status"]) => {
    const variants = {
      active: "bg-primary/10 text-primary border-primary/20",
      suspended: "bg-destructive/10 text-destructive border-destructive/20",
      pending: "bg-secondary/10 text-secondary-foreground border-secondary/20",
    }
    return variants[status]
  }

  const getPlanBadge = (plan: Dealer["subscriptionPlan"]) => {
    const variants = {
      basic: "bg-gray-100 text-gray-800 border-gray-200",
      premium: "bg-blue-100 text-blue-800 border-blue-200",
      enterprise: "bg-purple-100 text-purple-800 border-purple-200",
    }
    return variants[plan]
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dealer Management</h1>
          <p className="text-muted-foreground">Manage and monitor all registered dealers</p>
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">{filteredDealers.length} dealers</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dealers</CardTitle>
          <CardDescription>View and manage all registered dealers on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search dealers by business name, contact, or email..."
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
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={planFilter} onValueChange={(value) => dispatch(setPlanFilter(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Business</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Vehicles</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Locations</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDealers.map((dealer) => (
                  <TableRow key={dealer.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{dealer.businessName}</div>
                        <div className="text-sm text-muted-foreground">ID: {dealer.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{dealer.contactName}</div>
                        <div className="text-sm text-muted-foreground">{dealer.email}</div>
                        <div className="text-sm text-muted-foreground">{dealer.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getPlanBadge(dealer.subscriptionPlan)}>
                        {dealer.subscriptionPlan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadge(dealer.status)}>
                        {dealer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium">{dealer.totalVehicles}</div>
                        <div className="text-xs text-muted-foreground">vehicles</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {renderStars(dealer.rating)}
                        <span className="text-sm text-muted-foreground ml-1">{dealer.rating.toFixed(1)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{dealer.locations.length}</span>
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
                          <DropdownMenuItem onClick={() => handleViewDetails(dealer)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {dealer.status === "pending" && (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(dealer.id, "active")}
                              className="text-primary"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve Dealer
                            </DropdownMenuItem>
                          )}
                          {dealer.status === "active" ? (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(dealer.id, "suspended")}
                              className="text-destructive"
                            >
                              <Pause className="mr-2 h-4 w-4" />
                              Suspend Dealer
                            </DropdownMenuItem>
                          ) : (
                            dealer.status === "suspended" && (
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(dealer.id, "active")}
                                className="text-primary"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Reactivate Dealer
                              </DropdownMenuItem>
                            )
                          )}
                          {dealer.status === "pending" && (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(dealer.id, "suspended")}
                              className="text-destructive"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject Application
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

          {filteredDealers.length === 0 && (
            <div className="text-center py-8">
              <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold text-foreground">No dealers found</h3>
              <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Dealer Details</DialogTitle>
            <DialogDescription>Comprehensive information about {selectedDealer?.businessName}</DialogDescription>
          </DialogHeader>
          {selectedDealer && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Business Information</h4>
                  <div className="mt-2 space-y-1">
                    <p className="font-medium">{selectedDealer.businessName}</p>
                    <p className="text-sm text-muted-foreground">Contact: {selectedDealer.contactName}</p>
                    <p className="text-sm text-muted-foreground">{selectedDealer.email}</p>
                    <p className="text-sm text-muted-foreground">{selectedDealer.phone}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground">Account Status</h4>
                  <div className="mt-2 space-y-2">
                    <Badge variant="outline" className={getStatusBadge(selectedDealer.status)}>
                      {selectedDealer.status}
                    </Badge>
                    <Badge variant="outline" className={getPlanBadge(selectedDealer.subscriptionPlan)}>
                      {selectedDealer.subscriptionPlan} plan
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{selectedDealer.totalVehicles}</div>
                  <div className="text-sm text-muted-foreground">Total Vehicles</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{selectedDealer.rating.toFixed(1)}</div>
                  <div className="text-sm text-muted-foreground">Average Rating</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{selectedDealer.locations.length}</div>
                  <div className="text-sm text-muted-foreground">Locations</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Locations</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedDealer.locations.map((location, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {location}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Account History</h4>
                <p className="text-sm text-muted-foreground">
                  Joined: {new Date(selectedDealer.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
