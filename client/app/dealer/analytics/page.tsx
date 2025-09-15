"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Eye,
  MessageSquare,
  DollarSign,
  Car,
  Download,
  Target,
  Clock,
  Star,
} from "lucide-react"

// Mock analytics data
const salesData = [
  { month: "Jan", sales: 12, revenue: 780000, leads: 45, views: 1250 },
  { month: "Feb", sales: 15, revenue: 950000, leads: 52, views: 1380 },
  { month: "Mar", sales: 18, revenue: 1200000, leads: 68, views: 1520 },
  { month: "Apr", sales: 22, revenue: 1450000, leads: 75, views: 1680 },
  { month: "May", sales: 19, revenue: 1250000, leads: 63, views: 1590 },
  { month: "Jun", sales: 25, revenue: 1650000, leads: 82, views: 1750 },
]

const vehiclePerformanceData = [
  { vehicle: "BMW X5", views: 245, leads: 12, sales: 3, conversionRate: 25 },
  { vehicle: "Tesla Model S", views: 189, leads: 8, sales: 2, conversionRate: 25 },
  { vehicle: "Audi A4", views: 156, leads: 6, sales: 2, conversionRate: 33 },
  { vehicle: "Mercedes C-Class", views: 134, leads: 5, sales: 1, conversionRate: 20 },
  { vehicle: "Porsche 911", views: 98, leads: 4, sales: 1, conversionRate: 25 },
]

const leadSourceData = [
  { name: "Website", value: 45, color: "#0891b2" },
  { name: "Social Media", value: 25, color: "#84cc16" },
  { name: "Referrals", value: 20, color: "#f59e0b" },
  { name: "Phone Calls", value: 10, color: "#ef4444" },
]

const customerDemographicsData = [
  { ageGroup: "25-34", count: 28, percentage: 35 },
  { ageGroup: "35-44", count: 24, percentage: 30 },
  { ageGroup: "45-54", count: 16, percentage: 20 },
  { ageGroup: "55+", count: 12, percentage: 15 },
]

const weeklyTrafficData = [
  { day: "Mon", views: 245, leads: 8 },
  { day: "Tue", views: 312, leads: 12 },
  { day: "Wed", views: 189, leads: 6 },
  { day: "Thu", views: 278, leads: 9 },
  { day: "Fri", views: 356, leads: 15 },
  { day: "Sat", views: 423, leads: 18 },
  { day: "Sun", views: 298, leads: 10 },
]

const goalProgressData = [
  { name: "Monthly Sales", current: 25, target: 30, percentage: 83 },
  { name: "Lead Response", current: 95, target: 90, percentage: 100 },
  { name: "Customer Satisfaction", current: 4.8, target: 4.5, percentage: 100 },
]

export default function DealerAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6months")
  const [selectedMetric, setSelectedMetric] = useState("sales")

  const kpiData = [
    {
      title: "Total Revenue",
      value: "$1.65M",
      change: "+18%",
      trend: "up",
      icon: DollarSign,
      description: "Last 6 months",
    },
    {
      title: "Vehicles Sold",
      value: "111",
      change: "+12%",
      trend: "up",
      icon: Car,
      description: "This year",
    },
    {
      title: "Conversion Rate",
      value: "24.5%",
      change: "+2.1%",
      trend: "up",
      icon: Target,
      description: "Leads to sales",
    },
    {
      title: "Avg Response Time",
      value: "2.5h",
      change: "-30min",
      trend: "up",
      icon: Clock,
      description: "To customer inquiries",
    },
    {
      title: "Customer Rating",
      value: "4.8",
      change: "+0.2",
      trend: "up",
      icon: Star,
      description: "Average review score",
    },
    {
      title: "Total Leads",
      value: "385",
      change: "+23%",
      trend: "up",
      icon: MessageSquare,
      description: "Last 6 months",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your dealership's performance and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <kpi.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {kpi.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <p className={`text-xs font-medium ${kpi.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {kpi.change}
                </p>
                <p className="text-xs text-muted-foreground ml-1">{kpi.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue & Sales Trends</CardTitle>
                <CardDescription>Monthly performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.1}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
                <CardDescription>Where your leads are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={leadSourceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {leadSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {leadSourceData.map((item) => (
                    <div key={item.name} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">
                        {item.name}: {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Weekly Traffic & Leads</CardTitle>
              <CardDescription>Daily website views and lead generation</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyTrafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="leads" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sales Tab */}
        <TabsContent value="sales" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales Performance</CardTitle>
                <CardDescription>Number of vehicles sold per month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Demographics</CardTitle>
                <CardDescription>Age distribution of your customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerDemographicsData.map((demo) => (
                    <div key={demo.ageGroup} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium w-16">{demo.ageGroup}</span>
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${demo.percentage}%` }} />
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {demo.count} ({demo.percentage}%)
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Leads Tab */}
        <TabsContent value="leads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lead Generation Trends</CardTitle>
              <CardDescription>Monthly lead volume and conversion</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="leads"
                    stroke="hsl(var(--secondary))"
                    fill="hsl(var(--secondary))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vehicles Tab */}
        <TabsContent value="vehicles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Performance</CardTitle>
              <CardDescription>Individual vehicle metrics and conversion rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehiclePerformanceData.map((vehicle, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{vehicle.vehicle}</h4>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{vehicle.views} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{vehicle.leads} leads</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Car className="h-3 w-3" />
                          <span>{vehicle.sales} sales</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-primary">{vehicle.conversionRate}%</div>
                      <div className="text-xs text-muted-foreground">conversion</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Goals Tab */}
        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Goals</CardTitle>
              <CardDescription>Track progress towards your monthly targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {goalProgressData.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{goal.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {goal.current} / {goal.target}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(goal.percentage, 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{goal.percentage}% complete</span>
                      {goal.percentage >= 100 && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Goal Achieved
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
