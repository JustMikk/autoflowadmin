"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, Bell, Shield, Database, Mail, Globe, Users, Car, DollarSign, Save, RefreshCw } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "AutoFlow",
    siteDescription: "Premier car trading platform",
    adminEmail: "admin@autoflow.com",
    supportEmail: "support@autoflow.com",
    maintenanceMode: false,
    userRegistration: true,
    dealerApproval: true,
    autoListingApproval: false,
    emailNotifications: true,
    smsNotifications: false,
    maxVehiclesPerDealer: 100,
    commissionRate: 5.0,
    listingFee: 25.0,
    featuredListingFee: 75.0,
  })

  const handleSave = () => {
    console.log("Saving settings:", settings)
    // Mock save functionality
  }

  const handleReset = () => {
    // Mock reset functionality
    console.log("Resetting to defaults")
  }

  const featureToggles = [
    {
      key: "userRegistration",
      title: "User Registration",
      description: "Allow new users to register on the platform",
      icon: Users,
    },
    {
      key: "dealerApproval",
      title: "Dealer Approval Required",
      description: "Require admin approval for new dealer accounts",
      icon: Shield,
    },
    {
      key: "autoListingApproval",
      title: "Auto-approve Listings",
      description: "Automatically approve new vehicle listings",
      icon: Car,
    },
    {
      key: "emailNotifications",
      title: "Email Notifications",
      description: "Send email notifications to users and dealers",
      icon: Mail,
    },
    {
      key: "smsNotifications",
      title: "SMS Notifications",
      description: "Send SMS notifications for important updates",
      icon: Bell,
    },
    {
      key: "maintenanceMode",
      title: "Maintenance Mode",
      description: "Put the platform in maintenance mode",
      icon: Settings,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Platform Settings</h1>
          <p className="text-muted-foreground">Configure platform settings and feature toggles</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>Basic platform configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="adminEmail">Admin Email</Label>
              <Input
                id="adminEmail"
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Financial Settings
            </CardTitle>
            <CardDescription>Pricing and commission configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="commissionRate">Commission Rate (%)</Label>
              <Input
                id="commissionRate"
                type="number"
                step="0.1"
                value={settings.commissionRate}
                onChange={(e) => setSettings({ ...settings, commissionRate: Number.parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="listingFee">Basic Listing Fee ($)</Label>
              <Input
                id="listingFee"
                type="number"
                step="0.01"
                value={settings.listingFee}
                onChange={(e) => setSettings({ ...settings, listingFee: Number.parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="featuredListingFee">Featured Listing Fee ($)</Label>
              <Input
                id="featuredListingFee"
                type="number"
                step="0.01"
                value={settings.featuredListingFee}
                onChange={(e) => setSettings({ ...settings, featuredListingFee: Number.parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="maxVehicles">Max Vehicles per Dealer</Label>
              <Input
                id="maxVehicles"
                type="number"
                value={settings.maxVehiclesPerDealer}
                onChange={(e) => setSettings({ ...settings, maxVehiclesPerDealer: Number.parseInt(e.target.value) })}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Feature Toggles
          </CardTitle>
          <CardDescription>Enable or disable platform features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {featureToggles.map((toggle, index) => (
              <div key={toggle.key}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <toggle.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{toggle.title}</h3>
                        <Badge variant={settings[toggle.key as keyof typeof settings] ? "default" : "secondary"}>
                          {settings[toggle.key as keyof typeof settings] ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{toggle.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings[toggle.key as keyof typeof settings] as boolean}
                    onCheckedChange={(checked) => setSettings({ ...settings, [toggle.key]: checked })}
                  />
                </div>
                {index < featureToggles.length - 1 && <Separator className="mt-6" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            System Information
          </CardTitle>
          <CardDescription>Platform status and system details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">v2.1.0</div>
              <div className="text-sm text-muted-foreground">Platform Version</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">2.3GB</div>
              <div className="text-sm text-muted-foreground">Database Size</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
