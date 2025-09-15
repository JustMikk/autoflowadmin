"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Car, Building, FileText, CreditCard, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/store"
import { updateOnboardingStep, updateProfile } from "@/lib/slices/dealerAuthSlice"

const ONBOARDING_STEPS = [
  { id: 1, title: "Company Registration", icon: Building },
  { id: 2, title: "Terms & Conditions", icon: FileText },
  { id: 3, title: "Choose Plan", icon: CreditCard },
  { id: 4, title: "Company Details", icon: CheckCircle },
]

const SUBSCRIPTION_PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: "$29",
    period: "month",
    features: ["Up to 25 vehicle listings", "Basic analytics", "Email support", "Standard listing features"],
    recommended: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$79",
    period: "month",
    features: [
      "Up to 100 vehicle listings",
      "Advanced analytics",
      "Priority support",
      "Featured listings",
      "Lead management tools",
      "Custom branding",
    ],
    recommended: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$199",
    period: "month",
    features: [
      "Unlimited vehicle listings",
      "Full analytics suite",
      "24/7 phone support",
      "Premium placement",
      "Advanced lead tools",
      "White-label solution",
      "API access",
      "Dedicated account manager",
    ],
    recommended: false,
  },
]

export default function DealerOnboardingPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, onboardingStep } = useAppSelector((state) => state.dealerAuth)

  const [currentStep, setCurrentStep] = useState(onboardingStep)
  const [formData, setFormData] = useState({
    // Step 1: Company Registration
    businessLicense: "",
    taxId: "",
    businessType: "",
    yearsInBusiness: "",

    // Step 2: Terms acceptance
    termsAccepted: false,
    privacyAccepted: false,
    marketingConsent: false,

    // Step 3: Plan selection
    selectedPlan: "premium",

    // Step 4: Company Details
    address: "",
    city: "",
    state: "",
    zipCode: "",
    website: "",
    description: "",
    specialties: [] as string[],
    businessHours: {
      monday: { open: "09:00", close: "18:00", closed: false },
      tuesday: { open: "09:00", close: "18:00", closed: false },
      wednesday: { open: "09:00", close: "18:00", closed: false },
      thursday: { open: "09:00", close: "18:00", closed: false },
      friday: { open: "09:00", close: "18:00", closed: false },
      saturday: { open: "09:00", close: "17:00", closed: false },
      sunday: { open: "10:00", close: "16:00", closed: true },
    },
  })

  useEffect(() => {
    if (!user || user.onboardingCompleted) {
      router.push("/dealer/dashboard")
    }
  }, [user, router])

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length) {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      dispatch(updateOnboardingStep(nextStep))
    } else {
      // Complete onboarding
      dispatch(updateProfile({ onboardingCompleted: true }))
      router.push("/dealer/dashboard")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      dispatch(updateOnboardingStep(prevStep))
    }
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleSpecialty = (specialty: string) => {
    setFormData((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty],
    }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.businessLicense && formData.taxId && formData.businessType && formData.yearsInBusiness
      case 2:
        return formData.termsAccepted && formData.privacyAccepted
      case 3:
        return formData.selectedPlan
      case 4:
        return formData.address && formData.city && formData.state && formData.zipCode
      default:
        return true
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Building className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-semibold">Company Registration</h2>
              <p className="text-muted-foreground">Let's verify your business information</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessLicense">Business License Number</Label>
                <Input
                  id="businessLicense"
                  placeholder="Enter your business license number"
                  value={formData.businessLicense}
                  onChange={(e) => updateFormData("businessLicense", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID / EIN</Label>
                <Input
                  id="taxId"
                  placeholder="Enter your Tax ID or EIN"
                  value={formData.taxId}
                  onChange={(e) => updateFormData("taxId", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Business Type</Label>
                <RadioGroup
                  value={formData.businessType}
                  onValueChange={(value) => updateFormData("businessType", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dealership" id="dealership" />
                    <Label htmlFor="dealership">Licensed Dealership</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="independent" id="independent" />
                    <Label htmlFor="independent">Independent Dealer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="broker" id="broker" />
                    <Label htmlFor="broker">Auto Broker</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearsInBusiness">Years in Business</Label>
                <Input
                  id="yearsInBusiness"
                  type="number"
                  placeholder="How many years have you been in business?"
                  value={formData.yearsInBusiness}
                  onChange={(e) => updateFormData("yearsInBusiness", e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <FileText className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-semibold">Terms & Conditions</h2>
              <p className="text-muted-foreground">Please review and accept our terms</p>
            </div>

            <div className="space-y-6">
              <Card className="p-4 max-h-64 overflow-y-auto">
                <div className="space-y-4 text-sm">
                  <h3 className="font-semibold">AutoFlow Dealer Agreement</h3>
                  <p>
                    By using AutoFlow's platform, you agree to maintain accurate vehicle listings, respond to customer
                    inquiries promptly, and comply with all applicable laws and regulations regarding vehicle sales.
                  </p>
                  <p>
                    You are responsible for the accuracy of all vehicle information, pricing, and availability. AutoFlow
                    reserves the right to remove listings that violate our community guidelines.
                  </p>
                  <p>
                    Payment terms: Monthly subscriptions are billed in advance. You may cancel at any time with 30 days
                    notice. Refunds are not provided for partial months.
                  </p>
                </div>
              </Card>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => updateFormData("termsAccepted", checked)}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    I have read and agree to the <span className="text-primary">Terms of Service</span> and
                    <span className="text-primary"> Dealer Agreement</span>
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="privacy"
                    checked={formData.privacyAccepted}
                    onCheckedChange={(checked) => updateFormData("privacyAccepted", checked)}
                  />
                  <Label htmlFor="privacy" className="text-sm leading-relaxed">
                    I acknowledge that I have read the <span className="text-primary">Privacy Policy</span>
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="marketing"
                    checked={formData.marketingConsent}
                    onCheckedChange={(checked) => updateFormData("marketingConsent", checked)}
                  />
                  <Label htmlFor="marketing" className="text-sm leading-relaxed">
                    I consent to receiving marketing communications and platform updates (optional)
                  </Label>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <CreditCard className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-semibold">Choose Your Plan</h2>
              <p className="text-muted-foreground">Select the plan that best fits your business needs</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {SUBSCRIPTION_PLANS.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative cursor-pointer transition-all ${
                    formData.selectedPlan === plan.id ? "ring-2 ring-primary border-primary" : "hover:border-primary/50"
                  }`}
                  onClick={() => updateFormData("selectedPlan", plan.id)}
                >
                  {plan.recommended && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-accent">Recommended</Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <div className="text-3xl font-bold text-primary">
                      {plan.price}
                      <span className="text-sm font-normal text-muted-foreground">/{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Alert>
              <AlertDescription>
                You can upgrade or downgrade your plan at any time from your dashboard settings.
              </AlertDescription>
            </Alert>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <CheckCircle className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-2xl font-semibold">Company Details</h2>
              <p className="text-muted-foreground">Complete your business profile</p>
            </div>

            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street"
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    value={formData.city}
                    onChange={(e) => updateFormData("city", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="NY"
                    value={formData.state}
                    onChange={(e) => updateFormData("state", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    placeholder="10001"
                    value={formData.zipCode}
                    onChange={(e) => updateFormData("zipCode", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input
                  id="website"
                  placeholder="https://www.yourwebsite.com"
                  value={formData.website}
                  onChange={(e) => updateFormData("website", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell customers about your dealership, specialties, and what makes you unique..."
                  value={formData.description}
                  onChange={(e) => updateFormData("description", e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-3">
                <Label>Specialties (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    "Luxury Cars",
                    "Sports Cars",
                    "SUVs",
                    "Trucks",
                    "Electric Vehicles",
                    "Classic Cars",
                    "Commercial Vehicles",
                    "Motorcycles",
                  ].map((specialty) => (
                    <div
                      key={specialty}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        formData.specialties.includes(specialty)
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => toggleSpecialty(specialty)}
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox checked={formData.specialties.includes(specialty)} readOnly />
                        <span className="text-sm">{specialty}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="bg-primary rounded-lg p-2">
              <Car className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">AutoFlow</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Welcome to AutoFlow</h1>
          <p className="text-muted-foreground">Let's get your dealership set up in just a few steps</p>
        </div>

        {/* Progress Steps */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            {ONBOARDING_STEPS.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center space-x-2 ${
                      isActive ? "text-primary" : isCompleted ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`rounded-full p-2 ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : isCompleted
                            ? "bg-accent text-accent-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium hidden md:block">{step.title}</span>
                  </div>
                  {index < ONBOARDING_STEPS.length - 1 && (
                    <div className={`w-8 md:w-16 h-0.5 mx-2 ${isCompleted ? "bg-accent" : "bg-border"}`} />
                  )}
                </div>
              )
            })}
          </div>
          <Progress value={(currentStep / ONBOARDING_STEPS.length) * 100} className="w-full" />
        </div>

        {/* Step Content */}
        <Card className="border-border/50 shadow-lg">
          <CardContent className="p-8">{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          <Button onClick={handleNext} disabled={!canProceed()} className="flex items-center space-x-2">
            <span>{currentStep === ONBOARDING_STEPS.length ? "Complete Setup" : "Next"}</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
