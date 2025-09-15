"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Settings,
  User,
  Bell,
  Shield,
  Key,
  Trash2,
  Save,
  Upload,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Building,
  Globe,
} from "lucide-react"
import { useAppSelector } from "@/lib/store"

export default function DealerSettingsPage() {
  const { user } = useAppSelector((state) => state.dealerAuth)
  const [isEditing, setIsEditing] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  // Account settings state
  const [accountData, setAccountData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    companyName: user?.companyName || "",
    website: "",
    timezone: "America/New_York",
    language: "en",
  })

  // Notification settings state
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newLeads: true,
    leadUpdates: true,
    vehicleViews: false,
    weeklyReports: true,
    monthlyReports: true,
    systemUpdates: true,
    marketingEmails: false,
    reviewNotifications: true,
  })

  // Privacy settings state
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showContactInfo: true,
    allowDirectMessages: true,
    showBusinessHours: true,
    dataSharing: false,
    analyticsTracking: true,
  })

  // Security settings state
  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: "30",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleAccountUpdate = () => {
    // Handle account update
    setIsEditing(false)
  }

  const handlePasswordChange = () => {
    // Handle password change
    setSecurity((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }))
  }

  const handleDeleteAccount = () => {
    // Handle account deletion
    console.log("Account deletion requested")
  }

  const updateAccountData = (field: string, value: string) => {
    setAccountData((prev) => ({ ...prev, [field]: value }))
  }

  const updateNotifications = (field: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }))
  }

  const updatePrivacy = (field: string, value: any) => {
    setPrivacy((prev) => ({ ...prev, [field]: value }))
  }

  const updateSecurity = (field: string, value: any) => {
    setSecurity((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and security settings</p>
        </div>
        <div className="flex items-center space-x-3">
          {isEditing ? (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleAccountUpdate} className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Edit Settings</span>
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="danger">Danger Zone</TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-lg">
                      {accountData.firstName[0]}
                      {accountData.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                      <Upload className="h-4 w-4" />
                      <span>Change Photo</span>
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={accountData.firstName}
                      onChange={(e) => updateAccountData("firstName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={accountData.lastName}
                      onChange={(e) => updateAccountData("lastName", e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={accountData.email}
                      onChange={(e) => updateAccountData("email", e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={accountData.phone}
                      onChange={(e) => updateAccountData("phone", e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <span>Business Information</span>
                </CardTitle>
                <CardDescription>Manage your dealership details and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={accountData.companyName}
                    onChange={(e) => updateAccountData("companyName", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      type="url"
                      placeholder="https://www.example.com"
                      value={accountData.website}
                      onChange={(e) => updateAccountData("website", e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={accountData.timezone}
                    onValueChange={(value) => updateAccountData("timezone", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={accountData.language}
                    onValueChange={(value) => updateAccountData("language", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => updateNotifications("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via text message</p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked) => updateNotifications("smsNotifications", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lead & Customer Notifications</CardTitle>
                <CardDescription>Stay updated on customer interactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="newLeads">New Leads</Label>
                    <p className="text-sm text-muted-foreground">When you receive a new lead</p>
                  </div>
                  <Switch
                    id="newLeads"
                    checked={notifications.newLeads}
                    onCheckedChange={(checked) => updateNotifications("newLeads", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="leadUpdates">Lead Updates</Label>
                    <p className="text-sm text-muted-foreground">When leads change status</p>
                  </div>
                  <Switch
                    id="leadUpdates"
                    checked={notifications.leadUpdates}
                    onCheckedChange={(checked) => updateNotifications("leadUpdates", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="vehicleViews">Vehicle Views</Label>
                    <p className="text-sm text-muted-foreground">Daily summary of vehicle views</p>
                  </div>
                  <Switch
                    id="vehicleViews"
                    checked={notifications.vehicleViews}
                    onCheckedChange={(checked) => updateNotifications("vehicleViews", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="reviewNotifications">New Reviews</Label>
                    <p className="text-sm text-muted-foreground">When you receive customer reviews</p>
                  </div>
                  <Switch
                    id="reviewNotifications"
                    checked={notifications.reviewNotifications}
                    onCheckedChange={(checked) => updateNotifications("reviewNotifications", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reports & Updates</CardTitle>
                <CardDescription>Periodic reports and system updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weeklyReports">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Weekly performance summary</p>
                  </div>
                  <Switch
                    id="weeklyReports"
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => updateNotifications("weeklyReports", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="monthlyReports">Monthly Reports</Label>
                    <p className="text-sm text-muted-foreground">Monthly analytics and insights</p>
                  </div>
                  <Switch
                    id="monthlyReports"
                    checked={notifications.monthlyReports}
                    onCheckedChange={(checked) => updateNotifications("monthlyReports", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="systemUpdates">System Updates</Label>
                    <p className="text-sm text-muted-foreground">Platform updates and maintenance</p>
                  </div>
                  <Switch
                    id="systemUpdates"
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => updateNotifications("systemUpdates", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketingEmails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Tips, features, and promotions</p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => updateNotifications("marketingEmails", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>Control your privacy and data sharing preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="profileVisibility">Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">Who can see your dealership profile</p>
                </div>
                <Select
                  value={privacy.profileVisibility}
                  onValueChange={(value) => updatePrivacy("profileVisibility", value)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="customers">Customers Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showContactInfo">Show Contact Information</Label>
                  <p className="text-sm text-muted-foreground">Display phone and email on public profile</p>
                </div>
                <Switch
                  id="showContactInfo"
                  checked={privacy.showContactInfo}
                  onCheckedChange={(checked) => updatePrivacy("showContactInfo", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="allowDirectMessages">Allow Direct Messages</Label>
                  <p className="text-sm text-muted-foreground">Let customers message you directly</p>
                </div>
                <Switch
                  id="allowDirectMessages"
                  checked={privacy.allowDirectMessages}
                  onCheckedChange={(checked) => updatePrivacy("allowDirectMessages", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="showBusinessHours">Show Business Hours</Label>
                  <p className="text-sm text-muted-foreground">Display your operating hours publicly</p>
                </div>
                <Switch
                  id="showBusinessHours"
                  checked={privacy.showBusinessHours}
                  onCheckedChange={(checked) => updatePrivacy("showBusinessHours", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dataSharing">Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">Share anonymized data for platform improvements</p>
                </div>
                <Switch
                  id="dataSharing"
                  checked={privacy.dataSharing}
                  onCheckedChange={(checked) => updatePrivacy("dataSharing", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="analyticsTracking">Analytics Tracking</Label>
                  <p className="text-sm text-muted-foreground">Allow tracking for analytics and insights</p>
                </div>
                <Switch
                  id="analyticsTracking"
                  checked={privacy.analyticsTracking}
                  onCheckedChange={(checked) => updatePrivacy("analyticsTracking", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>Manage your account security and authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactorEnabled">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch
                    id="twoFactorEnabled"
                    checked={security.twoFactorEnabled}
                    onCheckedChange={(checked) => updateSecurity("twoFactorEnabled", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="loginAlerts">Login Alerts</Label>
                    <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                  </div>
                  <Switch
                    id="loginAlerts"
                    checked={security.loginAlerts}
                    onCheckedChange={(checked) => updateSecurity("loginAlerts", checked)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout</Label>
                  <Select
                    value={security.sessionTimeout}
                    onValueChange={(value) => updateSecurity("sessionTimeout", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Key className="h-5 w-5" />
                  <span>Change Password</span>
                </CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={security.currentPassword}
                      onChange={(e) => updateSecurity("currentPassword", e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={security.newPassword}
                      onChange={(e) => updateSecurity("newPassword", e.target.value)}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={security.confirmPassword}
                    onChange={(e) => updateSecurity("confirmPassword", e.target.value)}
                  />
                </div>

                <Button onClick={handlePasswordChange} className="w-full">
                  Update Password
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Danger Zone Tab */}
        <TabsContent value="danger" className="space-y-6">
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <Trash2 className="h-5 w-5" />
                <span>Danger Zone</span>
              </CardTitle>
              <CardDescription>Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
                <p className="text-sm text-red-700 mb-4">
                  Once you delete your account, there is no going back. This will permanently delete your dealership
                  profile, all vehicle listings, leads, and associated data.
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove all your data
                        from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700">
                        Yes, delete my account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                <h4 className="font-medium text-yellow-800 mb-2">Export Data</h4>
                <p className="text-sm text-yellow-700 mb-4">
                  Download a copy of all your data including vehicle listings, leads, and analytics before making any
                  permanent changes.
                </p>
                <Button
                  variant="outline"
                  className="border-yellow-300 text-yellow-800 hover:bg-yellow-100 bg-transparent"
                >
                  Export My Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
