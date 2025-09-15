"use client"

import { useState } from "react"
import { useAppSelector, useAppDispatch } from "@/lib/store"
import { updatePlan, addPlan } from "@/lib/slices/subscriptionsSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Plus,
  Edit,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  Calendar,
} from "lucide-react"
import type { SubscriptionPlan, Transaction } from "@/lib/slices/subscriptionsSlice"

export default function BillingPage() {
  const dispatch = useAppDispatch()
  const { plans, transactions } = useAppSelector((state) => state.subscriptions)
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null)
  const [planDialogOpen, setPlanDialogOpen] = useState(false)
  const [transactionFilter, setTransactionFilter] = useState("all")
  const [isEditing, setIsEditing] = useState(false)

  const [planForm, setPlanForm] = useState({
    name: "",
    price: 0,
    features: [] as string[],
    maxVehicles: 0,
    isActive: true,
  })

  const filteredTransactions = transactions.filter((transaction) => {
    if (transactionFilter === "all") return true
    return transaction.status === transactionFilter
  })

  const handleCreatePlan = () => {
    setSelectedPlan(null)
    setPlanForm({
      name: "",
      price: 0,
      features: [],
      maxVehicles: 0,
      isActive: true,
    })
    setIsEditing(false)
    setPlanDialogOpen(true)
  }

  const handleEditPlan = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan)
    setPlanForm({
      name: plan.name,
      price: plan.price,
      features: [...plan.features],
      maxVehicles: plan.maxVehicles,
      isActive: plan.isActive,
    })
    setIsEditing(true)
    setPlanDialogOpen(true)
  }

  const handleSavePlan = () => {
    const planData: SubscriptionPlan = {
      id: selectedPlan?.id || Date.now().toString(),
      ...planForm,
    }

    if (isEditing) {
      dispatch(updatePlan(planData))
    } else {
      dispatch(addPlan(planData))
    }

    setPlanDialogOpen(false)
  }

  const addFeature = () => {
    setPlanForm({
      ...planForm,
      features: [...planForm.features, ""],
    })
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...planForm.features]
    newFeatures[index] = value
    setPlanForm({
      ...planForm,
      features: newFeatures,
    })
  }

  const removeFeature = (index: number) => {
    setPlanForm({
      ...planForm,
      features: planForm.features.filter((_, i) => i !== index),
    })
  }

  const getStatusBadge = (status: Transaction["status"]) => {
    const variants = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      completed: "bg-primary/10 text-primary border-primary/20",
      refunded: "bg-destructive/10 text-destructive border-destructive/20",
    }
    return variants[status]
  }

  const getStatusIcon = (status: Transaction["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-primary" />
      case "refunded":
        return <XCircle className="h-4 w-4 text-destructive" />
    }
  }

  const totalRevenue = transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.amount, 0)

  const pendingRevenue = transactions.filter((t) => t.status === "pending").reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Billing & Subscriptions</h1>
          <p className="text-muted-foreground">Manage subscription plans and monitor transactions</p>
        </div>
        <Button onClick={handleCreatePlan} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Revenue</p>
                <p className="text-xl font-bold">${pendingRevenue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CreditCard className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Plans</p>
                <p className="text-xl font-bold">{plans.filter((p) => p.isActive).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-xl font-bold">{transactions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plans</CardTitle>
            <CardDescription>Manage available subscription plans for dealers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {plans.map((plan) => (
                <div key={plan.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{plan.name}</h3>
                      <Badge variant={plan.isActive ? "default" : "secondary"}>
                        {plan.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">${plan.price}</span>
                      <span className="text-sm text-muted-foreground">/month</span>
                    </div>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div className="text-sm text-muted-foreground">Up to {plan.maxVehicles} vehicles</div>
                    <ul className="text-sm space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditPlan(plan)}>
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest billing transactions and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4">
              <Select value={transactionFilter} onValueChange={setTransactionFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              {filteredTransactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{transaction.dealerName}</div>
                      <div className="text-xs text-muted-foreground capitalize">{transaction.type}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${transaction.amount}</div>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(transaction.status)}
                      <Badge variant="outline" className={getStatusBadge(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>Complete transaction history with detailed information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Dealer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{transaction.dealerName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="capitalize text-sm">{transaction.type.replace("_", " ")}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">{transaction.amount.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(transaction.status)}
                        <Badge variant="outline" className={getStatusBadge(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{new Date(transaction.createdAt).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={planDialogOpen} onOpenChange={setPlanDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Subscription Plan" : "Create New Subscription Plan"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update the subscription plan details" : "Create a new subscription plan for dealers"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Plan Name</Label>
                <Input
                  id="name"
                  value={planForm.name}
                  onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
                  placeholder="e.g., Premium"
                />
              </div>
              <div>
                <Label htmlFor="price">Monthly Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={planForm.price}
                  onChange={(e) => setPlanForm({ ...planForm, price: Number(e.target.value) })}
                  placeholder="199"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="maxVehicles">Maximum Vehicles</Label>
              <Input
                id="maxVehicles"
                type="number"
                value={planForm.maxVehicles}
                onChange={(e) => setPlanForm({ ...planForm, maxVehicles: Number(e.target.value) })}
                placeholder="50"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Features</Label>
                <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                  <Plus className="h-3 w-3 mr-1" />
                  Add Feature
                </Button>
              </div>
              <div className="space-y-2">
                {planForm.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="Feature description"
                    />
                    <Button type="button" variant="outline" size="sm" onClick={() => removeFeature(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={planForm.isActive}
                onCheckedChange={(checked) => setPlanForm({ ...planForm, isActive: checked })}
              />
              <Label htmlFor="isActive">Plan is active</Label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setPlanDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSavePlan}>{isEditing ? "Update Plan" : "Create Plan"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
