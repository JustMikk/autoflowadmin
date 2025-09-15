"use client"

import { useState } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/store"
import { setStatusFilter, updateReviewStatus } from "@/lib/slices/reviewsSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
import { Textarea } from "@/components/ui/textarea"
import { Star, MoreHorizontal, Eye, CheckCircle, XCircle, Clock, User, Building2 } from "lucide-react"
import type { Review } from "@/lib/slices/reviewsSlice"

export default function ReviewsPage() {
  const dispatch = useAppDispatch()
  const { reviews, statusFilter } = useAppSelector((state) => state.reviews)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [actionDialogOpen, setActionDialogOpen] = useState(false)
  const [pendingAction, setPendingAction] = useState<{ reviewId: string; action: Review["status"] } | null>(null)

  const filteredReviews = reviews.filter((review) => {
    const matchesStatus = statusFilter === "all" || review.status === statusFilter
    return matchesStatus
  })

  const handleStatusChange = (reviewId: string, status: Review["status"]) => {
    setPendingAction({ reviewId, action: status })
    setActionDialogOpen(true)
  }

  const confirmAction = () => {
    if (pendingAction) {
      dispatch(updateReviewStatus({ id: pendingAction.reviewId, status: pendingAction.action }))
      setPendingAction(null)
    }
    setActionDialogOpen(false)
  }

  const handleViewDetails = (review: Review) => {
    setSelectedReview(review)
    setDetailsOpen(true)
  }

  const getStatusBadge = (status: Review["status"]) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-primary/10 text-primary border-primary/20",
      rejected: "bg-destructive/10 text-destructive border-destructive/20",
    }
    return variants[status]
  }

  const getStatusIcon = (status: Review["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "approved":
        return <CheckCircle className="h-4 w-4 text-primary" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-destructive" />
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const getActionText = (action: Review["status"]) => {
    switch (action) {
      case "approved":
        return "approve"
      case "rejected":
        return "reject"
      default:
        return "update"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Review Management</h1>
          <p className="text-muted-foreground">Moderate and manage all reviews and ratings</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">{filteredReviews.length} reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-yellow-500" />
            <span className="text-sm text-muted-foreground">
              {filteredReviews.filter((r) => r.status === "pending").length} pending
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
                <p className="text-xl font-bold">{reviews.filter((r) => r.status === "pending").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-xl font-bold">{reviews.filter((r) => r.status === "approved").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <XCircle className="h-4 w-4 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-xl font-bold">{reviews.filter((r) => r.status === "rejected").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reviews & Ratings</CardTitle>
          <CardDescription>Moderate all reviews and ratings on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Select value={statusFilter} onValueChange={(value) => dispatch(setStatusFilter(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reviewer</TableHead>
                  <TableHead>Reviewee</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{review.reviewerName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {review.revieweeType === "dealer" ? (
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <User className="h-4 w-4 text-muted-foreground" />
                        )}
                        <div>
                          <div className="font-medium">{review.revieweeName}</div>
                          <div className="text-xs text-muted-foreground capitalize">{review.revieweeType}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-muted-foreground ml-1">({review.rating})</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="text-sm truncate">{review.comment}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(review.status)}
                        <Badge variant="outline" className={getStatusBadge(review.status)}>
                          {review.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString()}
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
                          <DropdownMenuItem onClick={() => handleViewDetails(review)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {review.status === "pending" && (
                            <>
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(review.id, "approved")}
                                className="text-primary"
                              >
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve Review
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleStatusChange(review.id, "rejected")}
                                className="text-destructive"
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject Review
                              </DropdownMenuItem>
                            </>
                          )}
                          {review.status === "approved" && (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(review.id, "rejected")}
                              className="text-destructive"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject Review
                            </DropdownMenuItem>
                          )}
                          {review.status === "rejected" && (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(review.id, "approved")}
                              className="text-primary"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve Review
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

          {filteredReviews.length === 0 && (
            <div className="text-center py-8">
              <Star className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold text-foreground">No reviews found</h3>
              <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filter criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
            <DialogDescription>Complete review information and moderation options</DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Reviewer</h4>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{selectedReview.reviewerName}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Reviewee</h4>
                  <div className="flex items-center gap-2">
                    {selectedReview.revieweeType === "dealer" ? (
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <User className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div>
                      <div className="font-medium">{selectedReview.revieweeName}</div>
                      <div className="text-xs text-muted-foreground capitalize">{selectedReview.revieweeType}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Rating & Review</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {renderStars(selectedReview.rating)}
                    <span className="text-lg font-semibold">{selectedReview.rating}/5</span>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm">{selectedReview.comment}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Status</h4>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(selectedReview.status)}
                    <Badge variant="outline" className={getStatusBadge(selectedReview.status)}>
                      {selectedReview.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <h4 className="font-semibold text-sm text-muted-foreground mb-1">Date</h4>
                  <p className="text-sm">{new Date(selectedReview.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Moderation Notes</h4>
                <Textarea placeholder="Add internal notes about this review..." />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Review Action</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {pendingAction ? getActionText(pendingAction.action) : ""} this review? This
              action will affect the review's visibility on the platform.
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
