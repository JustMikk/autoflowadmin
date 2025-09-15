"use client"

import { useState } from "react"
import { useAppSelector } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  ComposedChart,
} from "recharts"
import { TrendingUp, Download, Users, Building2, Car, DollarSign, Target, Activity } from "lucide-react"

const COLORS = ["#15803d", "#84cc16", "#4b5563", "#e5e7eb", "#22c55e"]

export default function AnalyticsPage() {
  const { kpis, revenueData, leadConversionData, vehiclesByMake, dealerPerformance, userGrowth } = useAppSelector(
    (state) => state.analytics,
  )
  const [timeRange, setTimeRange] = useState("6months")
  const [reportType, setReportType] = useState("overview")

  const platformMetrics = [
    {
      title: "Platform Growth Rate",
      value: `${kpis.monthlyGrowth}%`,
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      title: "User Acquisition Cost",
      value: "$24.50",
      change: "-5.2%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Dealer Retention Rate",
      value: "94.2%",
      change: "+1.8%",
      icon: Building2,
      color: "text-green-600",
    },
    {
      title: "Avg. Revenue Per Dealer",
      value: "$1,847",
      change: "+12.3%",
      icon: DollarSign,
      color: "text-purple-600",
    },
  ]

  const conversionMetrics = [
    { stage: "Visitors", count: 12500, conversion: 100 },
    { stage: "Signups", count: 1875, conversion: 15 },
    { stage: "Active Users", count: 1247, conversion: 66.5 },
    { stage: "Paying Dealers", count: 89, conversion: 7.1 },
  ]

  const geographicData = [
    { region: "North America", users: 687, dealers: 45, revenue: 89500 },
    { region: "Europe", users: 324, dealers: 23, revenue: 45200 },
    { region: "Asia Pacific", users: 156, dealers: 12, revenue: 23800 },
    { region: "Latin America", users: 80, dealers: 9, revenue: 15600 },
  ]

  const timeSeriesData = [
    { month: "Jan", users: 980, dealers: 65, revenue: 12500, leads: 180 },
    { month: "Feb", users: 1050, dealers: 68, revenue: 15200, leads: 195 },
    { month: "Mar", users: 1120, dealers: 72, revenue: 18900, leads: 210 },
    { month: "Apr", users: 1180, dealers: 76, revenue: 22100, leads: 225 },
    { month: "May", users: 1220, dealers: 82, revenue: 19800, leads: 240 },
    { month: "Jun", users: 1247, dealers: 89, revenue: 25400, leads: 234 },
  ]

  const handleExportReport = () => {
    // Mock export functionality
    console.log(`Exporting ${reportType} report for ${timeRange}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Reporting</h1>
          <p className="text-muted-foreground">Comprehensive platform analytics and performance insights</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExportReport} variant="outline" className="flex items-center gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {platformMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className={`text-xs ${metric.change.startsWith("+") ? "text-primary" : "text-destructive"}`}>
                    {metric.change} from last period
                  </p>
                </div>
                <div className={`p-2 rounded-lg bg-muted`}>
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Growth Trends</CardTitle>
            <CardDescription>User and dealer acquisition over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="users" fill="#15803d" name="Users" />
                <Line type="monotone" dataKey="dealers" stroke="#84cc16" strokeWidth={2} name="Dealers" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue & Lead Correlation</CardTitle>
            <CardDescription>Revenue performance vs lead generation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  fill="#15803d"
                  fillOpacity={0.1}
                  stroke="#15803d"
                  strokeWidth={2}
                  name="Revenue ($)"
                />
                <Line yAxisId="right" type="monotone" dataKey="leads" stroke="#84cc16" strokeWidth={2} name="Leads" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>User journey from visitor to paying customer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionMetrics.map((stage, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{stage.stage}</p>
                      <p className="text-sm text-muted-foreground">{stage.conversion}% conversion</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{stage.count.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>Platform usage by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {geographicData.map((region, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{region.region}</span>
                    <span className="text-sm text-muted-foreground">${region.revenue.toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{region.users} users</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span>{region.dealers} dealers</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${(region.users / 1247) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Dealers</CardTitle>
            <CardDescription>Dealers ranked by performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dealerPerformance.map((dealer, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">#{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{dealer.name}</p>
                      <p className="text-xs text-muted-foreground">{dealer.leads} leads</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{dealer.sales}</p>
                    <p className="text-xs text-muted-foreground">sales</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Distribution</CardTitle>
            <CardDescription>Popular vehicle makes on platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={vehiclesByMake}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#15803d"
                  dataKey="count"
                  label={({ make, percent }) => `${make} ${(percent * 100).toFixed(0)}%`}
                >
                  {vehiclesByMake.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Performance Indicators</CardTitle>
            <CardDescription>Critical metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="text-sm">Lead Conversion Rate</span>
                </div>
                <Badge variant="secondary">12.4%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Platform Uptime</span>
                </div>
                <Badge variant="secondary">99.9%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Avg. Listing Duration</span>
                </div>
                <Badge variant="secondary">18 days</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Customer LTV</span>
                </div>
                <Badge variant="secondary">$2,847</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
