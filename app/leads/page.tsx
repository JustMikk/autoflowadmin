"use client"

import { useState } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/store"
import { setStatusFilter, setPriorityFilter, updateLeadStatus } from "@/lib/slices/leadsSlice"
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
import { Textarea } from "@/components/ui/textarea"
import {
  MessageSquare,
  MoreHorizontal,
  Eye,
  Phone,
  Mail,
  Car,
  Building2,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react"
import type { Lead } from "@/lib/slices/leadsSlice"

export default function LeadsPage() {
  const dispatch = useAppDispatch()
  const { leads, statusFilter, priorityFilter } = useAppSelector((state) => state.leads)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [conversationOpen, setConversationOpen] = useState(false)

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    const matchesPriority = priorityFilter === "all" || lead.priority === priorityFilter
    return matchesStatus && matchesPriority
  })

  const handleStatusChange = (leadId: string, status: Lead["status"]) => {
    dispatch(updateLeadStatus({ id: leadId, status }))
  }

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead)
    setDetailsOpen(true)
  }

  const handleViewConversation = (lead: Lead) => {
    setSelectedLead(lead)
    setConversationOpen(true)
  }

  const getStatusBadge = (status: Lead["status"]) => {
    const variants = {
      new: "bg-blue-100 text-blue-800 border-blue-200",
      contacted: "bg-yellow-100 text-yellow-800 border-yellow-200",
      qualified: "bg-purple-100 text-purple-800 border-purple-200",
      converted: "bg-primary/10 text-primary border-primary/20",
      lost: "bg-destructive/10 text-destructive border-destructive/20",
    }
    return variants[status]
  }

  const getPriorityBadge = (priority: Lead["priority"]) => {
    const variants = {
      low: "bg-gray-100 text-gray-800 border-gray-200",
      medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
      high: "bg-red-100 text-red-800 border-red-200",
    }
    return variants[priority]
  }

  const getPriorityIcon = (priority: Lead["priority"]) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "low":
        return <TrendingUp className="h-4 w-4 text-gray-500" />
    }
  }

  const mockConversation = [
    {
      id: "1",
      sender: "John Smith",
      message: "Hi, I'm interested in the 2023 Toyota Camry. Is it still available?",
      timestamp: "2024-01-15T14:30:00Z",
      type: "buyer",
    },
    {
      id: "2",
      sender: "Premium Auto Sales",
      message: "Yes, it's still available! Would you like to schedule a test drive?",
      timestamp: "2024-01-15T15:45:00Z",
      type: "dealer",
    },
    {
      id: "3",
      sender: "John Smith",
      message: "That would be great! I'm available this weekend. What times work for you?",
      timestamp: "2024-01-15T16:20:00Z",
      type: "buyer",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lead Management</h1>
          <p className="text-muted-foreground">Monitor and manage all leads and conversations</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">{filteredLeads.length} leads</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              {filteredLeads.filter((l) => l.status === "converted").length} converted
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">New Leads</p>
                <p className="text-xl font-bold">{leads.filter((l) => l.status === "new").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Phone className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contacted</p>
                <p className="text-xl font-bold">{leads.filter((l) => l.status === "contacted").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CheckCircle className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Qualified</p>
                <p className="text-xl font-bold">{leads.filter((l) => l.status === "qualified").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Converted</p>
                <p className="text-xl font-bold">{leads.filter((l) => l.status === "converted").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leads & Conversations</CardTitle>
          <CardDescription>Monitor all buyer-seller interactions and lead progression</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Select value={statusFilter} onValueChange={(value) => dispatch(setStatusFilter(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="qualified">Qualified</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={(value) => dispatch(setPriorityFilter(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Dealer</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{lead.buyerName}</div>
                        <div className="text-sm text-muted-foreground">{lead.buyerEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{lead.vehicleName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{lead.dealerName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getPriorityIcon(lead.priority)}
                        <Badge variant="outline" className={getPriorityBadge(lead.priority)}>
                          {lead.priority}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadge(lead.status)}>
                        {lead.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(lead.lastContact).toLocaleDateString()}
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
                          <DropdownMenuItem onClick={() => handleViewDetails(lead)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewConversation(lead)}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            View Conversation
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(lead.id, "contacted")}
                            className="text-yellow-600"
                          >
                            <Phone className="mr-2 h-4 w-4" />
                            Mark as Contacted
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(lead.id, "qualified")}
                            className="text-purple-600"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as Qualified
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(lead.id, "converted")}
                            className="text-primary"
                          >
                            <TrendingUp className="mr-2 h-4 w-4" />
                            Mark as Converted
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusChange(lead.id, "lost")}
                            className="text-destructive"
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Mark as Lost
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredLeads.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold text-foreground">No leads found</h3>
              <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filter criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Lead Details</DialogTitle>
            <DialogDescription>Comprehensive information about this lead</DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Buyer Information</h4>
                  <div className="space-y-2">
                    <p className="font-medium">{selectedLead.buyerName}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {selectedLead.buyerEmail}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">Lead Status</h4>
                  <div className="space-y-2">
                    <Badge variant="outline" className={getStatusBadge(selectedLead.status)}>
                      {selectedLead.status}
                    </Badge>
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(selectedLead.priority)}
                      <Badge variant="outline" className={getPriorityBadge(selectedLead.priority)}>
                        {selectedLead.priority} priority
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Vehicle & Dealer</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{selectedLead.vehicleName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{selectedLead.dealerName}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-2">Timeline</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Created:</span>
                    <span>{new Date(selectedLead.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Contact:</span>
                    <span>{new Date(selectedLead.lastContact).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={conversationOpen} onOpenChange={setConversationOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Conversation History</DialogTitle>
            <DialogDescription>
              Messages between {selectedLead?.buyerName} and {selectedLead?.dealerName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {mockConversation.map((message) => (
              <div key={message.id} className={`flex ${message.type === "buyer" ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === "buyer" ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"
                  }`}
                >
                  <div className="text-xs font-medium mb-1">{message.sender}</div>
                  <div className="text-sm">{message.message}</div>
                  <div className="text-xs opacity-70 mt-1">{new Date(message.timestamp).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <Textarea placeholder="Add internal note about this conversation..." className="mb-2" />
            <Button size="sm">Add Note</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
