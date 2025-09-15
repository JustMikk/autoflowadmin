"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Car,
  LayoutDashboard,
  Building,
  MessageSquare,
  BarChart3,
  Settings,
  CreditCard,
  Menu,
  Plus,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "Dashboard",
    href: "/dealer/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Vehicles",
    href: "/dealer/vehicles",
    icon: Car,
  },
  {
    name: "Add Vehicle",
    href: "/dealer/vehicles/add",
    icon: Plus,
  },
  {
    name: "Leads & Messages",
    href: "/dealer/leads",
    icon: MessageSquare,
  },
  {
    name: "Company Profile",
    href: "/dealer/profile",
    icon: Building,
  },
  {
    name: "Analytics",
    href: "/dealer/analytics",
    icon: BarChart3,
  },
  {
    name: "Reviews",
    href: "/dealer/reviews",
    icon: Star,
  },
  {
    name: "Billing",
    href: "/dealer/billing",
    icon: CreditCard,
  },
  {
    name: "Settings",
    href: "/dealer/settings",
    icon: Settings,
  },
]

interface DealerSidebarProps {
  className?: string
}

export function DealerSidebar({ className }: DealerSidebarProps) {
  const pathname = usePathname()

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Link href="/dealer/dashboard" className="flex items-center space-x-2">
          <div className="bg-sidebar-primary rounded-lg p-2">
            <Car className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-sidebar-foreground">AutoFlow</span>
            <span className="text-xs text-sidebar-foreground/60">Dealer Portal</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-full bg-sidebar-primary flex items-center justify-center">
            <Building className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Premium Auto Sales</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">Premium Plan</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0", className)}>
        <div className="flex flex-col flex-grow bg-sidebar border-r border-sidebar-border">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-sidebar">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
