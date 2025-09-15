"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
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
  CreditCard,
  Download,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Zap,
  Crown,
  Receipt,
} from "lucide-react"

// Mock billing data
const currentPlan = {
  name: "Premium",
  price: 199,
  billingCycle: "monthly",
  features: [
    "Unlimited vehicle listings",
    "Advanced analytics",
    "Priority customer support",
    "Featured listings",
    "Lead management tools",
    "Custom branding",
  ],
  nextBillingDate: "2024-02-15",
  status: "active",
}

const availablePlans = [
  {
    id: "basic",
    name: "Basic",
    price: 49,
    yearlyPrice: 490,
    description: "Perfect for small dealerships",
    features: ["Up to 25 vehicle listings", "Basic analytics", "Email support", "Standard listing visibility"],
    popular: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 199,
    yearlyPrice: 1990,
    description: "Most popular for growing dealerships",
    features: [
      "Unlimited vehicle listings",
      "Advanced analytics",
      "Priority customer support",
      "Featured listings",
      "Lead management tools",
      "Custom branding",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 499,
    yearlyPrice: 4990,
    description: "For large dealership groups",
    features: [
      "Everything in Premium",
      "Multi-location management",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "White-label solution",
    ],
    popular: false,
  },
]

const billingHistory = [
  {
    id: "inv-001",
    date: "2024-01-15",
    description: "Premium Plan - Monthly",
    amount: 199.0,
    status: "paid",
    downloadUrl: "#",
  },
  {
    id: "inv-002",
    date: "2023-12-15",
    description: "Premium Plan - Monthly",
    amount: 199.0,
    status: "paid",
    downloadUrl: "#",
  },
  {
    id: "inv-003",
    date: "2023-11-15",
    description: "Premium Plan - Monthly",
    amount: 199.0,
    status: "paid",
    downloadUrl: "#",
  },
  {
    id: "inv-004",
    date: "2023-10-15",
    description: "Basic Plan - Monthly",
    amount: 49.0,
    status: "paid",
    downloadUrl: "#",
  },
  {
    id: "inv-005",
    date: "2023-09-15",
    description: "Basic Plan - Monthly",
    amount: 49.0,
    status: "failed",
    downloadUrl: "#",
  },
]

const paymentMethods = [
  {
    id: "card-001",
    type: "visa",
    last4: "4242",
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
  },
  {
    id: "card-002",
    type: "mastercard",
    last4: "8888",
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false,
  },
]

export default function DealerBillingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [selectedPlan, setSelectedPlan] = useState(currentPlan.name.toLowerCase())
  const [autoRenew, setAutoRenew] = useState(true)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "failed":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case "basic":
        return <Star className="h-5 w-5" />
      case "premium":
        return <Zap className="h-5 w-5" />
      case "enterprise":
        return <Crown className="h-5 w-5" />
      default:
        return <Star className="h-5 w-5" />
    }
  }

  const getCardIcon = (type: string) => {
    // In a real app, you'd use actual card brand icons
    return <CreditCard className="h-4 w-4" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Billing & Subscription</h1>
          <p className="text-muted-foreground">Manage your subscription and billing information</p>
        </div>
        <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
          <Download className="h-4 w-4" />
          <span>Download Invoice</span>
        </Button>
      </div>

      {/* Current Plan Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getPlanIcon(currentPlan.name)}
              <span>Current Plan: {currentPlan.name}</span>
            </CardTitle>
            <CardDescription>Your subscription details and usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">${currentPlan.price}/month</div>
                  <div className="text-sm text-muted-foreground">
                    Next billing: {new Date(currentPlan.nextBillingDate).toLocaleDateString()}
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Plan Features:</h4>
                <ul className="space-y-1">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center space-x-2 pt-4">
                <Switch checked={autoRenew} onCheckedChange={setAutoRenew} />
                <Label>Auto-renew subscription</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Usage This Month</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Vehicle Listings</span>
                <span className="text-sm font-medium">28 / Unlimited</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "28%" }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Featured Listings</span>
                <span className="text-sm font-medium">5 / 10</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "50%" }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">API Calls</span>
                <span className="text-sm font-medium">1.2K / 10K</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "12%" }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="plans" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="billing">Billing History</TabsTrigger>
          <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          <TabsTrigger value="usage">Usage & Analytics</TabsTrigger>
        </TabsList>

        {/* Plans Tab */}
        <TabsContent value="plans" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Choose Your Plan</h3>
            <div className="flex items-center space-x-2">
              <Label htmlFor="billing-toggle">Monthly</Label>
              <Switch
                id="billing-toggle"
                checked={billingCycle === "yearly"}
                onCheckedChange={(checked) => setBillingCycle(checked ? "yearly" : "monthly")}
              />
              <Label htmlFor="billing-toggle">
                Yearly{" "}
                <Badge variant="secondary" className="ml-1">
                  Save 20%
                </Badge>
              </Label>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {availablePlans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-2">{getPlanIcon(plan.name)}</div>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="text-3xl font-bold">
                    ${billingCycle === "yearly" ? plan.yearlyPrice : plan.price}
                    <span className="text-sm font-normal text-muted-foreground">
                      /{billingCycle === "yearly" ? "year" : "month"}
                    </span>
                  </div>
                  {billingCycle === "yearly" && (
                    <div className="text-sm text-green-600">Save ${plan.price * 12 - plan.yearlyPrice} per year</div>
                  )}
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full"
                        variant={plan.id === selectedPlan ? "outline" : "default"}
                        disabled={plan.id === selectedPlan}
                      >
                        {plan.id === selectedPlan ? "Current Plan" : "Upgrade"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm Plan Change</DialogTitle>
                        <DialogDescription>
                          You're about to change to the {plan.name} plan. This change will take effect immediately.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="p-4 bg-muted rounded-lg">
                          <div className="flex items-center justify-between">
                            <span>New Plan:</span>
                            <span className="font-medium">{plan.name}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Price:</span>
                            <span className="font-medium">
                              ${billingCycle === "yearly" ? plan.yearlyPrice : plan.price}/
                              {billingCycle === "yearly" ? "year" : "month"}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Next billing:</span>
                            <span className="font-medium">
                              {new Date(currentPlan.nextBillingDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Confirm Change</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Billing History Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View and download your past invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {billingHistory.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Receipt className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{invoice.description}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(invoice.date).toLocaleDateString()} • Invoice #{invoice.id}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-medium">${invoice.amount.toFixed(2)}</div>
                        <Badge className={getStatusColor(invoice.status)}>
                          {getStatusIcon(invoice.status)}
                          <span className="ml-1 capitalize">{invoice.status}</span>
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="payment" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Payment Methods</h3>
            <Button>Add Payment Method</Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {paymentMethods.map((method) => (
              <Card key={method.id} className={method.isDefault ? "border-primary" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getCardIcon(method.type)}
                      <div>
                        <div className="font-medium">•••• •••• •••• {method.last4}</div>
                        <div className="text-sm text-muted-foreground">
                          Expires {method.expiryMonth}/{method.expiryYear}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {method.isDefault && <Badge variant="secondary">Default</Badge>}
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Usage & Analytics Tab */}
        <TabsContent value="usage" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Monthly Spending</span>
                </CardTitle>
                <CardDescription>Your subscription costs over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>This Month</span>
                    <span className="text-2xl font-bold">$199.00</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Last Month</span>
                    <span>$199.00</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Average (6 months)</span>
                    <span>$174.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Cost Breakdown</span>
                </CardTitle>
                <CardDescription>Where your subscription money goes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Base Plan</span>
                    <span className="text-sm font-medium">$199.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Add-ons</span>
                    <span className="text-sm font-medium">$0.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Taxes</span>
                    <span className="text-sm font-medium">$0.00</span>
                  </div>
                  <hr />
                  <div className="flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span>$199.00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Feature Usage</CardTitle>
              <CardDescription>How you're using your plan features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Vehicle Listings</span>
                      <span className="text-sm">28 / Unlimited</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "28%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Featured Listings</span>
                      <span className="text-sm">5 / 10</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "50%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Lead Management</span>
                      <span className="text-sm">Active</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">API Calls</span>
                      <span className="text-sm">1.2K / 10K</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "12%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Analytics Views</span>
                      <span className="text-sm">245 / Unlimited</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "24%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Support Tickets</span>
                      <span className="text-sm">2 / Unlimited</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "2%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
