"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Car,
  TrendingUp,
  MessageSquare,
  Eye,
  DollarSign,
  Users,
  Star,
  Plus,
  ArrowUpRight,
  Clock,
  Phone,
} from "lucide-react"
import { useAppSelector } from "@/lib/store"

// Mock data for charts
const salesData = [
  { month: "Jan", sales: 12, revenue: 780000 },
  { month: "Feb", sales: 15, revenue: 950000 },
  { month: "Mar", sales: 18, revenue: 1200000 },
  { month: "Apr", sales: 22, revenue: 1450000 },
  { month: "May", sales: 19, revenue: 1250000 },
  { month: "Jun", sales: 25, revenue: 1650000 },
]

const viewsData = [
  { day: "Mon", views: 245 },
  { day: "Tue", views: 312 },
  { day: "Wed", views: 189 },
  { day: "Thu", views: 278 },
  { day: "Fri", views: 356 },
  { day: "Sat", views: 423 },
  { day: "Sun", views: 298 },
]

const vehicleStatusData = [
  { name: "Live", value: 15, color: "#22c55e" },
  { name: "Pending", value: 3, color: "#eab308" },
  { name: "Draft", value: 2, color: "#6b7280" },
  { name: "Sold", value: 8, color: "#3b82f6" },
]

const recentLeads = [
  {
    id: "1",
    customerName: "John Smith",
    vehicle: "2023 BMW X5",
    message: "Interested in scheduling a test drive",
    time: "2 minutes ago",
    status: "new",
    phone: "+1 (555) 123-4567",
    email: "john.smith@email.com",
  },
  {
    id: "2",
    customerName: "Sarah Johnson",
    vehicle: "2022 Tesla Model S",
    message: "What's the best price you can offer?",
    time: "15 minutes ago",
    status: "responded",
    phone: "+1 (555) 987-6543",
    email: "sarah.j@email.com",
  },
  {
    id: "3",
    customerName: "Mike Wilson",
    vehicle: "2021 Audi A4",
    message: "Is financing available?",
    time: "1 hour ago",
    status: "new",
    phone: "+1 (555) 456-7890",
    email: "mike.wilson@email.com",
  },
]

const recentActivity = [
  {
    id: "1",
    type: "vehicle_added",
    message: "New vehicle added: 2023 BMW X5",
    time: "30 minutes ago",
    icon: Car,
  },
  {
    id: "2",
    type: "lead_received",
    message: "New lead for Tesla Model S",
    time: "1 hour ago",
    icon: MessageSquare,
  },
  {
    id: "3",
    type: "vehicle_sold",
    message: "Vehicle sold: 2021 Mercedes C-Class",
    time: "2 hours ago",
    icon: DollarSign,
  },
  {
    id: "4",
    type: "review_received",
    message: "New 5-star review from customer",
    time: "3 hours ago",
    icon: Star,
  },
]

export default function DealerDashboardPage() {
  const { user } = useAppSelector((state) => state.dealerAuth)
  const { vehicles } = useAppSelector((state) => state.dealerVehicles)

  const totalViews = vehicles.reduce((sum, v) => sum + v.views, 0)
  const totalLeads = vehicles.reduce((sum, v) => sum + v.leads, 0)
  const liveVehicles = vehicles.filter((v) => v.status === "live").length
  const soldVehicles = vehicles.filter((v) => v.status === "sold").length

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.firstName}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your dealership today</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/dealer/vehicles/add">
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Vehicle</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicles.length}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +2
              </span>
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12%
              </span>
              from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +5
              </span>
              new this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.65M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +8%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
            <CardDescription>Monthly sales and revenue trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    name === "sales" ? `${value} vehicles` : `$${(value as number).toLocaleString()}`,
                    name === "sales" ? "Sales" : "Revenue",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stackId="1"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Status Distribution</CardTitle>
            <CardDescription>Current status of your inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={vehicleStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {vehicleStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {vehicleStatusData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Leads */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Leads
              <Badge variant="secondary">{recentLeads.length} new</Badge>
            </CardTitle>
            <CardDescription>Latest customer inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-start space-x-4 p-3 border rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      {lead.customerName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground truncate">{lead.customerName}</p>
                      <Badge variant={lead.status === "new" ? "default" : "secondary"} className="ml-2">
                        {lead.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{lead.vehicle}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{lead.message}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{lead.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="h-3 w-3" />
                        <span>{lead.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/dealer/leads">
                <Button variant="outline" className="w-full bg-transparent">
                  View All Leads
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your dealership</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Views Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Views</CardTitle>
          <CardDescription>Vehicle listing views over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Link href="/dealer/vehicles/add">
              <Button variant="outline" className="h-20 flex flex-col items-center space-y-2 bg-transparent">
                <Plus className="h-6 w-6" />
                <span>Add Vehicle</span>
              </Button>
            </Link>
            <Link href="/dealer/profile">
              <Button variant="outline" className="h-20 flex flex-col items-center space-y-2 bg-transparent">
                <Users className="h-6 w-6" />
                <span>Edit Profile</span>
              </Button>
            </Link>
            <Link href="/dealer/analytics">
              <Button variant="outline" className="h-20 flex flex-col items-center space-y-2 bg-transparent">
                <TrendingUp className="h-6 w-6" />
                <span>View Analytics</span>
              </Button>
            </Link>
            <Link href="/dealer/leads">
              <Button variant="outline" className="h-20 flex flex-col items-center space-y-2 bg-transparent">
                <MessageSquare className="h-6 w-6" />
                <span>Manage Leads</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Performance Goals */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Goals</CardTitle>
          <CardDescription>Track your progress towards monthly targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Sales Target</span>
                <span className="text-sm text-muted-foreground">25 / 30 vehicles</span>
              </div>
              <Progress value={83} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Revenue Target</span>
                <span className="text-sm text-muted-foreground">$1.65M / $2M</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Lead Response Rate</span>
                <span className="text-sm text-muted-foreground">95% / 90%</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
