"use client"

import { useAppSelector } from "@/lib/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  Users,
  Building2,
  Car,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Target,
  CreditCard,
  Activity,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const COLORS = ["#15803d", "#84cc16", "#4b5563", "#e5e7eb", "#22c55e"]

export default function DashboardPage() {
  const { kpis, revenueData, leadConversionData, vehiclesByMake, dealerPerformance, userGrowth } = useAppSelector(
    (state) => state.analytics,
  )

  const kpiCards = [
    {
      title: "Total Users",
      value: kpis.totalUsers.toLocaleString(),
      icon: Users,
      change: "+12%",
      trend: "up",
    },
    {
      title: "Active Dealers",
      value: kpis.totalDealers,
      icon: Building2,
      change: "+8%",
      trend: "up",
    },
    {
      title: "Active Listings",
      value: kpis.activeListings.toLocaleString(),
      icon: Car,
      change: "+15%",
      trend: "up",
    },
    {
      title: "Total Leads",
      value: kpis.totalLeads.toLocaleString(),
      icon: MessageSquare,
      change: "+23%",
      trend: "up",
    },
    {
      title: "Monthly Revenue",
      value: `$${(kpis.totalTransactions * 150).toLocaleString()}`,
      icon: DollarSign,
      change: "+18%",
      trend: "up",
    },
    {
      title: "Avg Deal Size",
      value: `$${kpis.avgDealSize.toLocaleString()}`,
      icon: Target,
      change: "+5.2%",
      trend: "up",
    },
    {
      title: "Active Subscriptions",
      value: kpis.activeSubscriptions,
      icon: CreditCard,
      change: "+12%",
      trend: "up",
    },
    {
      title: "Growth Rate",
      value: `${kpis.monthlyGrowth}%`,
      icon: Activity,
      change: "+2.1%",
      trend: "up",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground text-balance">AutoFlow Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive overview of your car trading platform</p>
        </div>
        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
          Live Data
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="bg-card hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">{kpi.title}</CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <kpi.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{kpi.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-primary" />
                <p className="text-xs text-primary font-medium">{kpi.change} from last month</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue growth over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
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
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#15803d"
                  fill="#15803d"
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">User & Dealer Growth</CardTitle>
            <CardDescription>Platform growth trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowth}>
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
                <Line type="monotone" dataKey="users" stroke="#15803d" strokeWidth={2} name="Users" />
                <Line type="monotone" dataKey="dealers" stroke="#84cc16" strokeWidth={2} name="Dealers" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Lead Conversion Funnel</CardTitle>
            <CardDescription>Lead progression through sales stages</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={leadConversionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="stage" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="#15803d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-card-foreground">Vehicle Distribution</CardTitle>
            <CardDescription>Most popular vehicle makes on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={vehiclesByMake}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#15803d"
                  dataKey="count"
                  label={({ make, percent }) => `${make} ${(percent * 100).toFixed(0)}%`}
                >
                  {vehiclesByMake.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f0fdf4",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-card-foreground">Top Performing Dealers</CardTitle>
          <CardDescription>Dealers with highest sales and lead generation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dealerPerformance.map((dealer, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">{dealer.name}</p>
                    <p className="text-sm text-muted-foreground">{dealer.leads} leads generated</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">{dealer.sales}</p>
                  <p className="text-sm text-muted-foreground">sales</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
