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
  MessageSquare,
  Search,
  Filter,
  Phone,
  Mail,
  Clock,
  Star,
  MoreHorizontal,
  Send,
  Eye,
  Car,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/store"
import { setPriorityFilter, updateLeadStatus } from "@/lib/slices/leadsSlice"

// Extended mock data for dealer leads
const mockDealerLeads = [
  {
    id: "1",
    customerName: "John Smith",
    customerEmail: "john.smith@email.com",
    customerPhone: "+1 (555) 123-4567",
    vehicle: "2023 BMW X5",
    vehicleId: "v1",
    message:
      "Hi, I'm interested in this BMW X5. Could we schedule a test drive this weekend? I'm available Saturday morning.",
    status: "new" as const,
    priority: "high" as const,
    createdAt: "2024-01-15T14:30:00Z",
    lastContact: "2024-01-15T14:30:00Z",
    source: "Website",
    budget: "$65,000",
    timeline: "This week",
    notes: "",
  },
  {
    id: "2",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@email.com",
    customerPhone: "+1 (555) 987-6543",
    vehicle: "2022 Tesla Model S",
    vehicleId: "v2",
    message:
      "What's the best price you can offer for this Tesla? I'm a serious buyer and can close quickly if the price is right.",
    status: "contacted" as const,
    priority: "high" as const,
    createdAt: "2024-01-14T10:15:00Z",
    lastContact: "2024-01-15T09:20:00Z",
    source: "Phone Call",
    budget: "$80,000",
    timeline: "Next month",
    notes: "Very interested, waiting for financing approval",
  },
  {
    id: "3",
    customerName: "Mike Wilson",
    customerEmail: "mike.wilson@email.com",
    customerPhone: "+1 (555) 456-7890",
    vehicle: "2021 Audi A4",
    vehicleId: "v3",
    message: "Is financing available for this Audi? What are the current rates and terms?",
    status: "qualified" as const,
    priority: "medium" as const,
    createdAt: "2024-01-13T16:45:00Z",
    lastContact: "2024-01-14T11:30:00Z",
    source: "Website",
    budget: "$45,000",
    timeline: "2-3 weeks",
    notes: "Pre-approved for financing, ready to move forward",
  },
  {
    id: "4",
    customerName: "Emily Davis",
    customerEmail: "emily.davis@email.com",
    customerPhone: "+1 (555) 321-0987",
    vehicle: "2023 Mercedes C-Class",
    vehicleId: "v4",
    message: "I saw this Mercedes online. Can you tell me more about its service history and any warranties?",
    status: "new" as const,
    priority: "medium" as const,
    createdAt: "2024-01-15T11:20:00Z",
    lastContact: "2024-01-15T11:20:00Z",
    source: "Social Media",
    budget: "$55,000",
    timeline: "Flexible",
    notes: "",
  },
  {
    id: "5",
    customerName: "Robert Chen",
    customerEmail: "robert.chen@email.com",
    customerPhone: "+1 (555) 654-3210",
    vehicle: "2022 Porsche 911",
    vehicleId: "v5",
    message: "I'm looking for a weekend car. Is this Porsche still available? What's the condition like?",
    status: "converted" as const,
    priority: "low" as const,
    createdAt: "2024-01-10T13:15:00Z",
    lastContact: "2024-01-12T15:45:00Z",
    source: "Referral",
    budget: "$120,000",
    timeline: "Completed",
    notes: "Sale completed - very satisfied customer",
  },
]

export default function DealerLeadsPage() {
  const dispatch = useAppDispatch()
  const { statusFilter, priorityFilter } = useAppSelector((state) => state.leads)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [replyMessage, setReplyMessage] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")

  const filteredLeads = mockDealerLeads.filter((lead) => {
    const matchesSearch =
      lead.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = selectedTab === "all" || lead.status === selectedTab
    const matchesPriority = priorityFilter === "all" || lead.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "contacted":
        return "bg-yellow-100 text-yellow-800"
      case "qualified":
        return "bg-purple-100 text-purple-800"
      case "converted":
        return "bg-green-100 text-green-800"
      case "lost":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <AlertCircle className="h-4 w-4" />
      case "contacted":
        return <MessageSquare className="h-4 w-4" />
      case "qualified":
        return <Star className="h-4 w-4" />
      case "converted":
        return <CheckCircle className="h-4 w-4" />
      case "lost":
        return <XCircle className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getStatusCounts = () => {
    return {
      all: mockDealerLeads.length,
      new: mockDealerLeads.filter((l) => l.status === "new").length,
      contacted: mockDealerLeads.filter((l) => l.status === "contacted").length,
      qualified: mockDealerLeads.filter((l) => l.status === "qualified").length,
      converted: mockDealerLeads.filter((l) => l.status === "converted").length,
      lost: mockDealerLeads.filter((l) => l.status === "lost").length,
    }
  }

  const statusCounts = getStatusCounts()

  const handleStatusChange = (leadId: string, newStatus: any) => {
    dispatch(updateLeadStatus({ id: leadId, status: newStatus }))
  }

  const handleSendReply = () => {
    // Handle sending reply
    setReplyMessage("")
    setSelectedLead(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Leads & Messages</h1>
          <p className="text-muted-foreground">Manage customer inquiries and communications</p>
        </div>
        <Button className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4" />
          <span>Compose Message</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDealerLeads.length}</div>
            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.new}</div>
            <p className="text-xs text-muted-foreground">Require response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5h</div>
            <p className="text-xs text-muted-foreground">-30min improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          <Select value={priorityFilter} onValueChange={(value) => dispatch(setPriorityFilter(value))}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
          <Filter className="h-4 w-4" />
          <span>More Filters</span>
        </Button>
      </div>

      {/* Lead Status Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
          <TabsTrigger value="new">New ({statusCounts.new})</TabsTrigger>
          <TabsTrigger value="contacted">Contacted ({statusCounts.contacted})</TabsTrigger>
          <TabsTrigger value="qualified">Qualified ({statusCounts.qualified})</TabsTrigger>
          <TabsTrigger value="converted">Converted ({statusCounts.converted})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          {filteredLeads.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No leads found</h3>
                <p className="text-muted-foreground text-center">
                  {searchQuery ? "Try adjusting your search criteria" : "New leads will appear here"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredLeads.map((lead) => (
                <Card key={lead.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>
                            {lead.customerName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{lead.customerName}</h3>
                            <Badge className={getStatusColor(lead.status)}>
                              {getStatusIcon(lead.status)}
                              <span className="ml-1 capitalize">{lead.status}</span>
                            </Badge>
                            <Badge className={getPriorityColor(lead.priority)}>{lead.priority} priority</Badge>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center space-x-1">
                              <Car className="h-4 w-4" />
                              <span>{lead.vehicle}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Mail className="h-4 w-4" />
                              <span>{lead.customerEmail}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="h-4 w-4" />
                              <span>{lead.customerPhone}</span>
                            </div>
                          </div>

                          <p className="text-foreground mb-3 line-clamp-2">{lead.message}</p>

                          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div>Source: {lead.source}</div>
                            <div>Budget: {lead.budget}</div>
                            <div>Timeline: {lead.timeline}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedLead(lead)}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Lead Details - {lead.customerName}</DialogTitle>
                              <DialogDescription>Inquiry about {lead.vehicle}</DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-sm font-medium">Customer</Label>
                                  <p className="text-sm">{lead.customerName}</p>
                                  <p className="text-sm text-muted-foreground">{lead.customerEmail}</p>
                                  <p className="text-sm text-muted-foreground">{lead.customerPhone}</p>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">Vehicle Interest</Label>
                                  <p className="text-sm">{lead.vehicle}</p>
                                  <p className="text-sm text-muted-foreground">Budget: {lead.budget}</p>
                                  <p className="text-sm text-muted-foreground">Timeline: {lead.timeline}</p>
                                </div>
                              </div>

                              <div>
                                <Label className="text-sm font-medium">Original Message</Label>
                                <p className="text-sm mt-1 p-3 bg-muted rounded-lg">{lead.message}</p>
                              </div>

                              <div>
                                <Label className="text-sm font-medium">Reply</Label>
                                <Textarea
                                  placeholder="Type your response..."
                                  value={replyMessage}
                                  onChange={(e) => setReplyMessage(e.target.value)}
                                  rows={4}
                                  className="mt-1"
                                />
                              </div>
                            </div>

                            <DialogFooter>
                              <Button variant="outline" onClick={() => setSelectedLead(null)}>
                                Cancel
                              </Button>
                              <Button onClick={handleSendReply}>
                                <Send className="h-4 w-4 mr-2" />
                                Send Reply
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
                            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleStatusChange(lead.id, "contacted")}>
                              Mark as Contacted
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(lead.id, "qualified")}>
                              Mark as Qualified
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(lead.id, "converted")}>
                              Mark as Converted
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(lead.id, "lost")}>
                              Mark as Lost
                            </DropdownMenuItem>
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
