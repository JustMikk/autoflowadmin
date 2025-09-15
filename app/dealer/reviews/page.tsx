"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Star,
  Search,
  Filter,
  MoreHorizontal,
  Reply,
  Flag,
  Eye,
  TrendingUp,
  MessageSquare,
  ThumbsUp,
  AlertTriangle,
} from "lucide-react"

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    customerName: "John Smith",
    customerEmail: "john.smith@email.com",
    rating: 5,
    title: "Excellent service and great car!",
    content:
      "I had an amazing experience buying my BMW X5 from this dealership. The staff was professional, knowledgeable, and helped me find exactly what I was looking for. The car was in perfect condition and the price was fair. Highly recommend!",
    vehiclePurchased: "2023 BMW X5",
    dateCreated: "2024-01-15T14:30:00Z",
    status: "published" as const,
    isVerified: true,
    helpfulVotes: 12,
    dealerResponse: "",
    source: "Google Reviews",
  },
  {
    id: "2",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@email.com",
    rating: 4,
    title: "Good experience overall",
    content:
      "The buying process was smooth and the sales team was helpful. The only minor issue was the wait time for paperwork, but everything else was great. The Tesla Model S is exactly what I wanted.",
    vehiclePurchased: "2022 Tesla Model S",
    dateCreated: "2024-01-14T10:15:00Z",
    status: "published" as const,
    isVerified: true,
    helpfulVotes: 8,
    dealerResponse:
      "Thank you for your feedback, Sarah! We're glad you're happy with your Tesla. We're working on streamlining our paperwork process to reduce wait times.",
    source: "Website",
  },
  {
    id: "3",
    customerName: "Mike Wilson",
    customerEmail: "mike.wilson@email.com",
    rating: 2,
    title: "Disappointing experience",
    content:
      "The car had some issues that weren't disclosed upfront. The sales person seemed more interested in making a quick sale than ensuring customer satisfaction. Had to bring the car back twice for repairs.",
    vehiclePurchased: "2021 Audi A4",
    dateCreated: "2024-01-13T16:45:00Z",
    status: "flagged" as const,
    isVerified: true,
    helpfulVotes: 3,
    dealerResponse: "",
    source: "Yelp",
  },
  {
    id: "4",
    customerName: "Emily Davis",
    customerEmail: "emily.davis@email.com",
    rating: 5,
    title: "Outstanding customer service!",
    content:
      "From start to finish, the team at this dealership exceeded my expectations. They were transparent about pricing, helped with financing, and made sure I was completely satisfied with my purchase.",
    vehiclePurchased: "2023 Mercedes C-Class",
    dateCreated: "2024-01-12T11:20:00Z",
    status: "published" as const,
    isVerified: true,
    helpfulVotes: 15,
    dealerResponse:
      "Thank you so much, Emily! We're thrilled that you had such a positive experience. Enjoy your new Mercedes!",
    source: "Facebook",
  },
  {
    id: "5",
    customerName: "Anonymous User",
    customerEmail: "anonymous@email.com",
    rating: 1,
    title: "Terrible service",
    content: "Worst dealership ever. They sold me a lemon and refused to take responsibility. Avoid at all costs!",
    vehiclePurchased: "Unknown",
    dateCreated: "2024-01-11T09:30:00Z",
    status: "pending" as const,
    isVerified: false,
    helpfulVotes: 0,
    dealerResponse: "",
    source: "Anonymous",
  },
]

export default function DealerReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [selectedReview, setSelectedReview] = useState<any>(null)
  const [responseText, setResponseText] = useState("")

  const filteredReviews = mockReviews.filter((review) => {
    const matchesSearch =
      review.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = selectedTab === "all" || review.status === selectedTab
    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter

    return matchesSearch && matchesStatus && matchesRating
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "flagged":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-600"
    if (rating >= 3) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusCounts = () => {
    return {
      all: mockReviews.length,
      published: mockReviews.filter((r) => r.status === "published").length,
      pending: mockReviews.filter((r) => r.status === "pending").length,
      flagged: mockReviews.filter((r) => r.status === "flagged").length,
    }
  }

  const statusCounts = getStatusCounts()
  const averageRating = mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length

  const handleSendResponse = () => {
    // Handle sending response
    setResponseText("")
    setSelectedReview(null)
  }

  const renderStars = (rating: number, size = "w-4 h-4") => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customer Reviews</h1>
          <p className="text-muted-foreground">Manage and respond to customer feedback</p>
        </div>
        <Button className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4" />
          <span>Request Reviews</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockReviews.length}</div>
            <p className="text-xs text-muted-foreground">+2 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
              {renderStars(Math.round(averageRating))}
            </div>
            <p className="text-xs text-muted-foreground">+0.2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <Reply className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Reviews with responses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.pending}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          <Select value={ratingFilter} onValueChange={setRatingFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
              <SelectItem value="2">2 Stars</SelectItem>
              <SelectItem value="1">1 Star</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
          <Filter className="h-4 w-4" />
          <span>More Filters</span>
        </Button>
      </div>

      {/* Review Status Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
          <TabsTrigger value="published">Published ({statusCounts.published})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({statusCounts.pending})</TabsTrigger>
          <TabsTrigger value="flagged">Flagged ({statusCounts.flagged})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredReviews.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Star className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No reviews found</h3>
                <p className="text-muted-foreground text-center">
                  {searchQuery ? "Try adjusting your search criteria" : "New reviews will appear here"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <Card key={review.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>
                            {review.customerName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{review.customerName}</h3>
                            {review.isVerified && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                Verified Purchase
                              </Badge>
                            )}
                            <Badge className={getStatusColor(review.status)}>{review.status}</Badge>
                          </div>

                          <div className="flex items-center space-x-4 mb-3">
                            {renderStars(review.rating)}
                            <span className={`font-semibold ${getRatingColor(review.rating)}`}>{review.rating}.0</span>
                            <span className="text-sm text-muted-foreground">
                              {new Date(review.dateCreated).toLocaleDateString()}
                            </span>
                            <span className="text-sm text-muted-foreground">via {review.source}</span>
                          </div>

                          <h4 className="font-medium text-foreground mb-2">{review.title}</h4>
                          <p className="text-foreground mb-3 line-clamp-3">{review.content}</p>

                          {review.vehiclePurchased && (
                            <div className="text-sm text-muted-foreground mb-3">Vehicle: {review.vehiclePurchased}</div>
                          )}

                          {review.dealerResponse && (
                            <div className="bg-muted/50 rounded-lg p-3 mt-3">
                              <div className="flex items-center space-x-2 mb-2">
                                <Reply className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium text-primary">Dealer Response</span>
                              </div>
                              <p className="text-sm">{review.dealerResponse}</p>
                            </div>
                          )}

                          <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <ThumbsUp className="h-3 w-3" />
                              <span>{review.helpfulVotes} helpful</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedReview(review)}>
                              <Reply className="h-4 w-4 mr-1" />
                              {review.dealerResponse ? "Edit Response" : "Respond"}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Respond to Review</DialogTitle>
                              <DialogDescription>Respond to {review.customerName}'s review</DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                              <div className="p-4 bg-muted/50 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  {renderStars(review.rating)}
                                  <span className="font-medium">{review.title}</span>
                                </div>
                                <p className="text-sm">{review.content}</p>
                              </div>

                              <div>
                                <Label className="text-sm font-medium">Your Response</Label>
                                <Textarea
                                  placeholder="Write a professional response to this review..."
                                  value={responseText || review.dealerResponse}
                                  onChange={(e) => setResponseText(e.target.value)}
                                  rows={4}
                                  className="mt-1"
                                />
                              </div>
                            </div>

                            <DialogFooter>
                              <Button variant="outline" onClick={() => setSelectedReview(null)}>
                                Cancel
                              </Button>
                              <Button onClick={handleSendResponse}>
                                {review.dealerResponse ? "Update Response" : "Send Response"}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Full Review
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Flag className="h-4 w-4 mr-2" />
                              {review.status === "flagged" ? "Unflag Review" : "Flag Review"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Hide Review</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
